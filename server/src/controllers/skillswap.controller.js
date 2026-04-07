// server/src/controllers/skillswap.controller.js
const { SkillSwap, SkillCredit, User } = require('../models');
const { Op } = require('sequelize');

class SkillSwapController {
  async listSwaps(req, res) {
    try {
      const { category, search, mode, limit = 20, offset = 0 } = req.query;
      const where = { isActive: true };

      if (category && category !== 'all') where.category = category;
      if (mode && mode !== 'all') where.mode = mode;
      if (search) {
        where[Op.or] = [
          { offering: { [Op.iLike]: `%${search}%` } },
          { wants: { [Op.iLike]: `%${search}%` } }
        ];
      }

      const { count, rows } = await SkillSwap.findAndCountAll({
        where,
        include: [{ model: User, as: 'user', attributes: ['id', 'firstName', 'lastName', 'avatar'] }],
        order: [['createdAt', 'DESC']],
        limit: parseInt(limit),
        offset: parseInt(offset)
      });

      res.json({ success: true, total: count, data: rows });
    } catch (error) {
      console.error('List swaps error:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }

  async getSwap(req, res) {
    try {
      const swap = await SkillSwap.findByPk(req.params.id, {
        include: [{ model: User, as: 'user', attributes: ['id', 'firstName', 'lastName', 'avatar'] }]
      });

      if (!swap) return res.status(404).json({ success: false, message: 'Skill swap not found' });
      res.json({ success: true, data: swap });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }

  async createSwap(req, res) {
    try {
      const swap = await SkillSwap.create({ ...req.body, userId: req.user.userId });
      res.status(201).json({ success: true, data: swap });
    } catch (error) {
      console.error('Create swap error:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }

  async updateSwap(req, res) {
    try {
      const swap = await SkillSwap.findOne({ where: { id: req.params.id, userId: req.user.userId } });
      if (!swap) return res.status(404).json({ success: false, message: 'Skill swap not found or unauthorized' });

      await swap.update(req.body);
      res.json({ success: true, data: swap });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }

  async deleteSwap(req, res) {
    try {
      const swap = await SkillSwap.findOne({ where: { id: req.params.id, userId: req.user.userId } });
      if (!swap) return res.status(404).json({ success: false, message: 'Skill swap not found or unauthorized' });

      await swap.destroy();
      res.json({ success: true, message: 'Skill swap deleted' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }

  async getMySwaps(req, res) {
    try {
      const swaps = await SkillSwap.findAll({
        where: { userId: req.user.userId },
        order: [['createdAt', 'DESC']]
      });
      res.json({ success: true, data: swaps });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }
}

module.exports = new SkillSwapController();
