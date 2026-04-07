// server/src/routes/student.routes.js
const express = require('express');
const studentController = require('../controllers/student.controller');
const authMiddleware = require('../middleware/auth.middleware');
const roleMiddleware = require('../middleware/permission.middleware');

const router = express.Router();

router.use(authMiddleware);
router.use(roleMiddleware(['student', 'admin']));

router.get('/dashboard', studentController.getDashboard);
router.put('/profile', studentController.updateProfile);
router.get('/achievements', studentController.getAchievements);
router.get('/leaderboard', studentController.getLeaderboard);

module.exports = router;
