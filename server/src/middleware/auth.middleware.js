// server/src/middleware/auth.middleware.js
const jwt = require('jsonwebtoken');
const { User, Student, Faculty, Admin } = require('../models');
const { JWT_SECRET } = require('../config/constants');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access token required'
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findByPk(decoded.userId);

    if (!user || !user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token'
      });
    }

    // Add role-specific ID to user object
    let roleId = null;
    switch (user.role) {
      case 'student':
        const student = await Student.findOne({ where: { userId: user.id } });
        roleId = student?.id;
        break;
      case 'faculty':
        const faculty = await Faculty.findOne({ where: { userId: user.id } });
        roleId = faculty?.id;
        break;
      case 'admin':
        const admin = await Admin.findOne({ where: { userId: user.id } });
        roleId = admin?.id;
        break;
    }

    req.user = {
      userId: user.id,
      email: user.email,
      role: user.role,
      [`${user.role}Id`]: roleId
    };

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }
};

module.exports = authMiddleware;