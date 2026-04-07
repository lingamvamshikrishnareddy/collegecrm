// server/src/routes/gaming.routes.js
const express = require('express');
const gamingController = require('../controllers/gaming.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

router.use(authMiddleware);

router.get('/tournaments', gamingController.listTournaments);
router.get('/tournaments/:id', gamingController.getTournament);
router.post('/tournaments', gamingController.createTournament);
router.put('/tournaments/:id', gamingController.updateTournament);
router.post('/tournaments/:id/register', gamingController.registerForTournament);
router.get('/profile/:userId?', gamingController.getProfile);
router.put('/profile', gamingController.upsertProfile);

module.exports = router;
