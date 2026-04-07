// server/src/routes/event.routes.js
const express = require('express');
const eventController = require('../controllers/event.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

router.get('/', eventController.getEvents);
router.get('/:id', eventController.getEventById);

router.use(authMiddleware);
router.post('/', eventController.createEvent);
router.post('/:eventId/register', eventController.registerForEvent);

module.exports = router;