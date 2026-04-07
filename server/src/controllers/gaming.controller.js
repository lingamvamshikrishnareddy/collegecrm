// server/src/controllers/gaming.controller.js
const { Tournament, TournamentRegistration, GamingProfile, User } = require('../models');
const { Op } = require('sequelize');

class GamingController {
  async listTournaments(req, res) {
    try {
      const { game, status, limit = 20, offset = 0 } = req.query;
      const where = {};

      if (game && game !== 'all') where.game = game;
      if (status && status !== 'all') where.status = status;

      const { count, rows } = await Tournament.findAndCountAll({
        where,
        include: [{ model: User, as: 'creator', attributes: ['id', 'firstName', 'lastName'] }],
        order: [['startDate', 'ASC']],
        limit: parseInt(limit),
        offset: parseInt(offset)
      });

      res.json({ success: true, total: count, data: rows });
    } catch (error) {
      console.error('List tournaments error:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }

  async getTournament(req, res) {
    try {
      const tournament = await Tournament.findByPk(req.params.id, {
        include: [
          { model: User, as: 'creator', attributes: ['id', 'firstName', 'lastName'] },
          {
            model: TournamentRegistration, as: 'registrations',
            include: [{ model: User, as: 'player', attributes: ['id', 'firstName', 'lastName', 'avatar'] }]
          }
        ]
      });

      if (!tournament) return res.status(404).json({ success: false, message: 'Tournament not found' });
      res.json({ success: true, data: tournament });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }

  async createTournament(req, res) {
    try {
      const tournament = await Tournament.create({ ...req.body, createdBy: req.user.userId });
      res.status(201).json({ success: true, data: tournament });
    } catch (error) {
      console.error('Create tournament error:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }

  async updateTournament(req, res) {
    try {
      const tournament = await Tournament.findOne({ where: { id: req.params.id, createdBy: req.user.userId } });
      if (!tournament) return res.status(404).json({ success: false, message: 'Tournament not found or unauthorized' });

      await tournament.update(req.body);
      res.json({ success: true, data: tournament });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }

  async registerForTournament(req, res) {
    try {
      const { id: tournamentId } = req.params;
      const { teamName, members } = req.body;

      const tournament = await Tournament.findByPk(tournamentId);
      if (!tournament) return res.status(404).json({ success: false, message: 'Tournament not found' });
      if (tournament.status !== 'registering') {
        return res.status(400).json({ success: false, message: 'Tournament is not open for registration' });
      }
      if (tournament.filledSlots >= tournament.totalSlots) {
        return res.status(400).json({ success: false, message: 'Tournament is full' });
      }

      const existing = await TournamentRegistration.findOne({ where: { tournamentId, userId: req.user.userId } });
      if (existing) return res.status(409).json({ success: false, message: 'Already registered' });

      const registration = await TournamentRegistration.create({
        tournamentId, userId: req.user.userId, teamName, members
      });
      await tournament.increment('filledSlots');

      res.status(201).json({ success: true, data: registration });
    } catch (error) {
      console.error('Register tournament error:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }

  async getProfile(req, res) {
    try {
      const userId = req.params.userId || req.user.userId;
      const profile = await GamingProfile.findOne({ where: { userId } });
      if (!profile) return res.status(404).json({ success: false, message: 'Gaming profile not found' });
      res.json({ success: true, data: profile });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }

  async upsertProfile(req, res) {
    try {
      const [profile] = await GamingProfile.upsert({ ...req.body, userId: req.user.userId });
      res.json({ success: true, data: profile });
    } catch (error) {
      console.error('Upsert profile error:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }
}

module.exports = new GamingController();
