// server/src/controllers/gig.controller.js
const { Gig, GigApplication, User } = require('../models');
const { validationResult } = require('express-validator');
const { Op } = require('sequelize');

class GigController {
  async listGigs(req, res) {
    try {
      const { type, search, status = 'open', limit = 20, offset = 0 } = req.query;
      const where = { status };

      if (type && type !== 'all') where.type = type;
      if (search) {
        where[Op.or] = [
          { title: { [Op.iLike]: `%${search}%` } },
          { description: { [Op.iLike]: `%${search}%` } }
        ];
      }

      const { count, rows } = await Gig.findAndCountAll({
        where,
        include: [{ model: User, as: 'poster', attributes: ['id', 'firstName', 'lastName', 'avatar'] }],
        order: [['isUrgent', 'DESC'], ['createdAt', 'DESC']],
        limit: parseInt(limit),
        offset: parseInt(offset)
      });

      res.json({ success: true, total: count, data: rows });
    } catch (error) {
      console.error('List gigs error:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }

  async getGig(req, res) {
    try {
      const gig = await Gig.findByPk(req.params.id, {
        include: [
          { model: User, as: 'poster', attributes: ['id', 'firstName', 'lastName', 'avatar'] },
          {
            model: GigApplication, as: 'applications',
            include: [{ model: User, as: 'applicant', attributes: ['id', 'firstName', 'lastName', 'avatar'] }]
          }
        ]
      });

      if (!gig) return res.status(404).json({ success: false, message: 'Gig not found' });
      res.json({ success: true, data: gig });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }

  async createGig(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
      }

      const gig = await Gig.create({
        ...req.body,
        postedBy: req.user.userId,
        payAmount: parseFloat(req.body.pay?.replace(/[^0-9.]/g, '')) || 0
      });

      res.status(201).json({ success: true, data: gig });
    } catch (error) {
      console.error('Create gig error:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }

  async updateGig(req, res) {
    try {
      const gig = await Gig.findOne({ where: { id: req.params.id, postedBy: req.user.userId } });
      if (!gig) return res.status(404).json({ success: false, message: 'Gig not found or unauthorized' });

      await gig.update(req.body);
      res.json({ success: true, data: gig });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }

  async deleteGig(req, res) {
    try {
      const gig = await Gig.findOne({ where: { id: req.params.id, postedBy: req.user.userId } });
      if (!gig) return res.status(404).json({ success: false, message: 'Gig not found or unauthorized' });

      await gig.destroy();
      res.json({ success: true, message: 'Gig deleted' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }

  async applyToGig(req, res) {
    try {
      const { id: gigId } = req.params;
      const { message } = req.body;

      const gig = await Gig.findByPk(gigId);
      if (!gig) return res.status(404).json({ success: false, message: 'Gig not found' });
      if (gig.status !== 'open') return res.status(400).json({ success: false, message: 'Gig is no longer open' });
      if (gig.postedBy === req.user.userId) return res.status(400).json({ success: false, message: 'Cannot apply to your own gig' });

      const existing = await GigApplication.findOne({ where: { gigId, applicantId: req.user.userId } });
      if (existing) return res.status(409).json({ success: false, message: 'Already applied' });

      const application = await GigApplication.create({ gigId, applicantId: req.user.userId, message });
      await gig.increment('applicantsCount');

      res.status(201).json({ success: true, data: application });
    } catch (error) {
      console.error('Apply to gig error:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }

  async updateApplicationStatus(req, res) {
    try {
      const { applicationId } = req.params;
      const { status, rating, review } = req.body;

      const app = await GigApplication.findByPk(applicationId, {
        include: [{ model: Gig, as: 'gig' }]
      });

      if (!app) return res.status(404).json({ success: false, message: 'Application not found' });
      if (app.gig.postedBy !== req.user.userId) return res.status(403).json({ success: false, message: 'Unauthorized' });

      const updateData = { status };
      if (status === 'completed') {
        updateData.rating = rating;
        updateData.review = review;
        updateData.completedAt = new Date();
        await app.gig.update({ status: 'completed' });
      } else if (status === 'accepted') {
        await app.gig.update({ status: 'in-progress' });
      }

      await app.update(updateData);
      res.json({ success: true, data: app });
    } catch (error) {
      console.error('Update application error:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }

  async getMyGigs(req, res) {
    try {
      const posted = await Gig.findAll({
        where: { postedBy: req.user.userId },
        include: [{ model: GigApplication, as: 'applications' }],
        order: [['createdAt', 'DESC']]
      });

      const applied = await GigApplication.findAll({
        where: { applicantId: req.user.userId },
        include: [{
          model: Gig, as: 'gig',
          include: [{ model: User, as: 'poster', attributes: ['id', 'firstName', 'lastName'] }]
        }],
        order: [['createdAt', 'DESC']]
      });

      res.json({ success: true, data: { posted, applied } });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }

  async getPortfolio(req, res) {
    try {
      const userId = req.params.userId || req.user.userId;

      const completed = await GigApplication.findAll({
        where: { applicantId: userId, status: 'completed' },
        include: [{
          model: Gig, as: 'gig',
          include: [{ model: User, as: 'poster', attributes: ['firstName', 'lastName'] }]
        }],
        order: [['completedAt', 'DESC']]
      });

      const totalEarned = completed.reduce((sum, a) => sum + (parseFloat(a.gig.payAmount) || 0), 0);
      const ratings = completed.filter(a => a.rating).map(a => a.rating);
      const avgRating = ratings.length ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1) : null;

      res.json({ success: true, data: { completedGigs: completed, totalEarned, avgRating, count: completed.length } });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }
}

module.exports = new GigController();
