// server/src/controllers/rental.controller.js
const { Rental, User } = require('../models');
const { Op } = require('sequelize');

class RentalController {
  async listRentals(req, res) {
    try {
      const { mediaType, status, limit = 20, offset = 0 } = req.query;
      const where = { userId: req.user.userId };

      if (mediaType && mediaType !== 'all') where.mediaType = mediaType;
      if (status && status !== 'all') where.status = status;

      const { count, rows } = await Rental.findAndCountAll({
        where,
        order: [['createdAt', 'DESC']],
        limit: parseInt(limit),
        offset: parseInt(offset)
      });

      res.json({ success: true, total: count, data: rows });
    } catch (error) {
      console.error('List rentals error:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }

  async getRental(req, res) {
    try {
      const rental = await Rental.findOne({ where: { id: req.params.id, userId: req.user.userId } });
      if (!rental) return res.status(404).json({ success: false, message: 'Rental not found' });
      res.json({ success: true, data: rental });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }

  async createRental(req, res) {
    try {
      const { mediaId, mediaTitle, mediaType, genre, platform, rentalPeriod, amountPaid, paymentReference } = req.body;

      const periodDays = { '1-day': 1, '1-week': 7, '1-month': 30 };
      const days = periodDays[rentalPeriod] || 1;
      const expiresAt = new Date(Date.now() + days * 24 * 60 * 60 * 1000);

      const rental = await Rental.create({
        userId: req.user.userId,
        mediaId, mediaTitle, mediaType, genre, platform,
        rentalPeriod, amountPaid, paymentReference, expiresAt
      });

      res.status(201).json({ success: true, data: rental });
    } catch (error) {
      console.error('Create rental error:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }

  async expireRentals(req, res) {
    try {
      const [updated] = await Rental.update(
        { status: 'expired' },
        { where: { status: 'active', expiresAt: { [Op.lt]: new Date() } } }
      );
      res.json({ success: true, expired: updated });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }
}

module.exports = new RentalController();
