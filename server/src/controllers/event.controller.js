// server/src/controllers/event.controller.js
const { Event, Student, User, College } = require('../models');
const { Op } = require('sequelize');

class EventController {
  async getEvents(req, res) {
    try {
      const { type, status, upcoming } = req.query;
      const where = { status: 'published' };

      if (type) where.eventType = type;
      if (status) where.status = status;
      if (upcoming) where.startDate = { [Op.gte]: new Date() };

      const events = await Event.findAll({
        where,
        include: [
          { model: User, as: 'organizer', attributes: ['id', 'firstName', 'lastName'] }
        ],
        order: [['startDate', 'ASC']]
      });

      res.json({ success: true, data: events });
    } catch (error) {
      console.error('Get events error:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }

  async getEventById(req, res) {
    try {
      const event = await Event.findByPk(req.params.id, {
        include: [
          { model: User, as: 'organizer', attributes: ['id', 'firstName', 'lastName'] },
          { model: Student, as: 'participants', through: { attributes: ['registeredAt'] } }
        ]
      });

      if (!event) {
        return res.status(404).json({ success: false, message: 'Event not found' });
      }

      res.json({ success: true, data: event });
    } catch (error) {
      console.error('Get event error:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }

  async registerForEvent(req, res) {
    try {
      const { eventId } = req.params;
      const studentId = req.user.studentId;

      const event = await Event.findByPk(eventId);
      if (!event) {
        return res.status(404).json({ success: false, message: 'Event not found' });
      }

      const student = await Student.findByPk(studentId);
      if (!student) {
        return res.status(404).json({ success: false, message: 'Student not found' });
      }

      const existing = await student.getEvents({ where: { id: eventId } });
      if (existing.length > 0) {
        return res.status(409).json({ success: false, message: 'Already registered' });
      }

      if (event.maxParticipants && event.currentParticipants >= event.maxParticipants) {
        return res.status(400).json({ success: false, message: 'Event is full' });
      }

      await student.addEvent(event, { through: { registeredAt: new Date() } });
      await event.increment('currentParticipants');

      res.json({ success: true, message: 'Registered successfully' });
    } catch (error) {
      console.error('Register for event error:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }

  async createEvent(req, res) {
    try {
      const event = await Event.create({
        ...req.body,
        organizerId: req.user.userId
      });

      res.status(201).json({ success: true, data: event });
    } catch (error) {
      console.error('Create event error:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }
}

module.exports = new EventController();
