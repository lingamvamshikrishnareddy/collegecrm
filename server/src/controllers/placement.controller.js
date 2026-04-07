// server/src/controllers/placement.controller.js
const { Placement, Student, User } = require('../models');

class PlacementController {
  async getPlacements(req, res) {
    try {
      const { status, type } = req.query;
      let where = {};
      
      if (status) where.status = status;
      if (type) where.type = type;

      const placements = await Placement.findAll({
        where,
        include: [{ 
          model: Student, 
          as: 'student',
          include: [{ model: User, as: 'user' }]
        }]
      });

      res.json({ success: true, data: placements });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }

  async createPlacement(req, res) {
    try {
      const placement = await Placement.create(req.body);
      res.status(201).json({ success: true, data: placement });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }
}

module.exports = new PlacementController();
