// server/src/controllers/auth.controller.js
const jwt = require('jsonwebtoken');
const { User, Student, Admin, College } = require('../models');
const { validationResult } = require('express-validator');
const authService = require('../services/auth.service');
const emailService = require('../services/email.service');
const { JWT_SECRET, JWT_EXPIRES_IN } = require('../config/constants');

class AuthController {
  async register(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, message: 'Validation failed', errors: errors.array() });
      }

      const { email, password, firstName, lastName, role, collegeCode, ...profileData } = req.body;

      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(409).json({ success: false, message: 'User already exists with this email' });
      }

      // Find college (optional — students need it, admin may not)
      let college = null;
      if (collegeCode) {
        college = await College.findOne({ where: { code: collegeCode } });
        if (!college) {
          return res.status(404).json({ success: false, message: 'Invalid college code' });
        }
      }

      const user = await User.create({ email, password, firstName, lastName, role });

      // Create role profile
      if (role === 'student' && college) {
        await Student.create({ userId: user.id, collegeId: college.id, ...profileData });
      } else if (role === 'admin') {
        await Admin.create({ userId: user.id, collegeId: college?.id, ...profileData });
      }

      const verificationToken = authService.generateVerificationToken(user.id);
      await emailService.sendVerificationEmail(user.email, user.firstName, verificationToken);

      res.status(201).json({
        success: true,
        message: 'Registered successfully. Please verify your email.',
        data: {
          user: { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName, role: user.role }
        }
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }

  async login(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, message: 'Validation failed', errors: errors.array() });
      }

      const { email, password } = req.body;

      const user = await User.findOne({
        where: { email },
        include: [
          { model: Student, as: 'studentProfile', include: [{ model: College, as: 'college' }] },
          { model: Admin, as: 'adminProfile', include: [{ model: College, as: 'college' }] }
        ]
      });

      if (!user) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
      }

      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
      }

      if (!user.isActive) {
        return res.status(403).json({ success: false, message: 'Account is deactivated. Please contact support.' });
      }

      await user.update({ lastLogin: new Date() });

      const token = jwt.sign(
        { userId: user.id, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
      );

      const profile = user.role === 'student' ? user.studentProfile
        : user.role === 'admin' ? user.adminProfile
        : null;

      res.json({
        success: true,
        message: 'Login successful',
        data: {
          token,
          user: {
            id: user.id, email: user.email, firstName: user.firstName,
            lastName: user.lastName, role: user.role, avatar: user.avatar,
            emailVerified: user.emailVerified, lastLogin: user.lastLogin
          },
          profile,
          college: profile?.college || null
        }
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }

  async verifyEmail(req, res) {
    try {
      const { token } = req.params;
      const decoded = authService.verifyToken(token);
      if (!decoded) {
        return res.status(400).json({ success: false, message: 'Invalid or expired verification token' });
      }

      const user = await User.findByPk(decoded.userId);
      if (!user) return res.status(404).json({ success: false, message: 'User not found' });
      if (user.emailVerified) return res.status(400).json({ success: false, message: 'Email already verified' });

      await user.update({ emailVerified: true });
      res.json({ success: true, message: 'Email verified successfully' });
    } catch (error) {
      console.error('Email verification error:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }

  async forgotPassword(req, res) {
    try {
      const { email } = req.body;
      const user = await User.findOne({ where: { email } });

      if (user) {
        const resetToken = authService.generatePasswordResetToken(user.id);
        await emailService.sendPasswordResetEmail(user.email, user.firstName, resetToken);
      }

      res.json({ success: true, message: 'If an account with this email exists, a password reset link has been sent.' });
    } catch (error) {
      console.error('Forgot password error:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }

  async resetPassword(req, res) {
    try {
      const { token } = req.params;
      const { password } = req.body;

      const decoded = authService.verifyToken(token);
      if (!decoded) {
        return res.status(400).json({ success: false, message: 'Invalid or expired reset token' });
      }

      const user = await User.findByPk(decoded.userId);
      if (!user) return res.status(404).json({ success: false, message: 'User not found' });

      await user.update({ password });
      res.json({ success: true, message: 'Password reset successfully' });
    } catch (error) {
      console.error('Reset password error:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }

  async getProfile(req, res) {
    try {
      const user = await User.findByPk(req.user.userId, {
        include: [
          { model: Student, as: 'studentProfile', include: [{ model: College, as: 'college' }] },
          { model: Admin, as: 'adminProfile', include: [{ model: College, as: 'college' }] }
        ]
      });

      if (!user) return res.status(404).json({ success: false, message: 'User not found' });

      const profile = user.role === 'student' ? user.studentProfile
        : user.role === 'admin' ? user.adminProfile
        : null;

      res.json({ success: true, data: { user, profile, college: profile?.college || null } });
    } catch (error) {
      console.error('Get profile error:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }

  async logout(req, res) {
    res.json({ success: true, message: 'Logged out successfully' });
  }
}

module.exports = new AuthController();
