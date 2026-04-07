// services/gig.service.js
const { Gig, GigApplication, User } = require('../models');
const { Op } = require('sequelize');

class GigService {
  async listGigs({ type, search, status = 'open', limit = 20, offset = 0 }) {
    const where = { status };

    if (type && type !== 'all') {
      where.type = type;
    }

    if (search) {
      where[Op.or] = [
        { title: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } }
      ];
    }

    const { count, rows } = await Gig.findAndCountAll({
      where,
      include: [{
        model: User,
        as: 'poster',
        attributes: ['id', 'firstName', 'lastName', 'avatar']
      }],
      order: [['isUrgent', 'DESC'], ['createdAt', 'DESC']],
      limit,
      offset
    });

    return { total: count, gigs: rows };
  }

  async getGigById(gigId) {
    const gig = await Gig.findByPk(gigId, {
      include: [
        { model: User, as: 'poster', attributes: ['id', 'firstName', 'lastName', 'avatar'] },
        {
          model: GigApplication,
          as: 'applications',
          include: [{ model: User, as: 'applicant', attributes: ['id', 'firstName', 'lastName', 'avatar'] }]
        }
      ]
    });

    if (!gig) throw new Error('Gig not found');
    return gig;
  }

  async createGig(userId, data) {
    const gig = await Gig.create({
      postedBy: userId,
      ...data,
      payAmount: parseFloat(data.pay?.replace(/[^0-9.]/g, '')) || 0
    });
    return gig;
  }

  async updateGig(gigId, userId, data) {
    const gig = await Gig.findOne({ where: { id: gigId, postedBy: userId } });
    if (!gig) throw new Error('Gig not found or unauthorized');
    await gig.update(data);
    return gig;
  }

  async deleteGig(gigId, userId) {
    const gig = await Gig.findOne({ where: { id: gigId, postedBy: userId } });
    if (!gig) throw new Error('Gig not found or unauthorized');
    await gig.destroy();
    return { success: true };
  }

  async applyToGig(gigId, userId, message) {
    const gig = await Gig.findByPk(gigId);
    if (!gig) throw new Error('Gig not found');
    if (gig.status !== 'open') throw new Error('Gig is no longer accepting applications');
    if (gig.postedBy === userId) throw new Error('Cannot apply to your own gig');

    const existing = await GigApplication.findOne({ where: { gigId, applicantId: userId } });
    if (existing) throw new Error('Already applied to this gig');

    const application = await GigApplication.create({ gigId, applicantId: userId, message });
    await gig.increment('applicantsCount');
    return application;
  }

  async updateApplicationStatus(applicationId, posterId, status) {
    const app = await GigApplication.findByPk(applicationId, {
      include: [{ model: Gig, as: 'gig' }]
    });
    if (!app) throw new Error('Application not found');
    if (app.gig.postedBy !== posterId) throw new Error('Unauthorized');

    await app.update({ status });
    if (status === 'accepted') {
      await app.gig.update({ status: 'in-progress' });
    }
    return app;
  }

  async completeGig(applicationId, posterId, rating, review) {
    const app = await GigApplication.findByPk(applicationId, {
      include: [{ model: Gig, as: 'gig' }]
    });
    if (!app) throw new Error('Application not found');
    if (app.gig.postedBy !== posterId) throw new Error('Unauthorized');

    await app.update({ status: 'completed', rating, review, completedAt: new Date() });
    await app.gig.update({ status: 'completed' });
    return app;
  }

  async getMyGigs(userId) {
    const posted = await Gig.findAll({
      where: { postedBy: userId },
      include: [{ model: GigApplication, as: 'applications' }],
      order: [['createdAt', 'DESC']]
    });

    const applied = await GigApplication.findAll({
      where: { applicantId: userId },
      include: [{
        model: Gig,
        as: 'gig',
        include: [{ model: User, as: 'poster', attributes: ['id', 'firstName', 'lastName'] }]
      }],
      order: [['createdAt', 'DESC']]
    });

    return { posted, applied };
  }

  async getPortfolio(userId) {
    const completed = await GigApplication.findAll({
      where: { applicantId: userId, status: 'completed' },
      include: [{ model: Gig, as: 'gig', include: [{ model: User, as: 'poster', attributes: ['firstName', 'lastName'] }] }],
      order: [['completedAt', 'DESC']]
    });

    const totalEarned = completed.reduce((sum, app) => sum + (parseFloat(app.gig.payAmount) || 0), 0);
    const ratings = completed.filter(a => a.rating).map(a => a.rating);
    const avgRating = ratings.length ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1) : null;

    return { completedGigs: completed, totalEarned, avgRating, count: completed.length };
  }
}

module.exports = new GigService();
