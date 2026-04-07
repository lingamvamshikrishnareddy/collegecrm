// server/src/controllers/student.controller.js
const { Student, User, College, Achievement, Event } = require('../models');
const { validationResult } = require('express-validator');
const { Op } = require('sequelize');

class StudentController {
  async getDashboard(req, res) {
    try {
      const studentId = req.user.role === 'student' ? req.user.studentId : req.params.studentId;

      const student = await Student.findByPk(studentId, {
        include: [
          { model: User, as: 'user' },
          { model: College, as: 'college' }
        ]
      });

      if (!student) {
        return res.status(404).json({ success: false, message: 'Student not found' });
      }

      // Upcoming events
      const upcomingEvents = await Event.findAll({
        where: {
          startDate: { [Op.gte]: new Date() },
          collegeId: student.collegeId,
          status: 'published'
        },
        limit: 5,
        order: [['startDate', 'ASC']]
      });

      res.json({
        success: true,
        data: {
          student,
          stats: {
            totalPoints: student.totalPoints,
            level: student.level,
            cgpa: student.cgpa
          },
          upcomingEvents
        }
      });
    } catch (error) {
      console.error('Get dashboard error:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }

  async updateProfile(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, message: 'Validation failed', errors: errors.array() });
      }

      const studentId = req.user.studentId;
      const { firstName, lastName, phone, avatar, ...studentData } = req.body;

      const student = await Student.findByPk(studentId, {
        include: [{ model: User, as: 'user' }]
      });

      if (!student) {
        return res.status(404).json({ success: false, message: 'Student not found' });
      }

      if (firstName || lastName || phone || avatar) {
        await student.user.update({
          ...(firstName && { firstName }),
          ...(lastName && { lastName }),
          ...(phone && { phone }),
          ...(avatar && { avatar })
        });
      }

      await student.update(studentData);

      const updated = await Student.findByPk(studentId, {
        include: [{ model: User, as: 'user' }, { model: College, as: 'college' }]
      });

      res.json({ success: true, message: 'Profile updated successfully', data: updated });
    } catch (error) {
      console.error('Update profile error:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }

  async getAchievements(req, res) {
    try {
      const studentId = req.user.studentId;
      const { type, limit = 20, offset = 0 } = req.query;

      const student = await Student.findByPk(studentId);
      let where = { userId: student.userId };
      if (type) where.type = type;

      const achievements = await Achievement.findAndCountAll({
        where,
        limit: parseInt(limit),
        offset: parseInt(offset),
        order: [['createdAt', 'DESC']]
      });

      res.json({
        success: true,
        data: achievements.rows,
        pagination: {
          total: achievements.count,
          limit: parseInt(limit),
          offset: parseInt(offset),
          pages: Math.ceil(achievements.count / limit)
        }
      });
    } catch (error) {
      console.error('Get achievements error:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }

  async getLeaderboard(req, res) {
    try {
      const studentId = req.user.studentId;
      const student = await Student.findByPk(studentId);

      const leaderboard = await Student.findAll({
        where: { collegeId: student.collegeId },
        include: [{ model: User, as: 'user', attributes: ['firstName', 'lastName', 'avatar'] }],
        attributes: ['id', 'totalPoints', 'level'],
        order: [['totalPoints', 'DESC']],
        limit: 50
      });

      res.json({
        success: true,
        data: leaderboard.map((s, i) => ({ rank: i + 1, ...s.toJSON() }))
      });
    } catch (error) {
      console.error('Get leaderboard error:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }
}

module.exports = new StudentController();
