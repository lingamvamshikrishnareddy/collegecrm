// server/src/routes/index.js
const express = require('express');
const router = express.Router();

const authRoutes       = require('./auth.routes');
const studentRoutes    = require('./student.routes');
const eventRoutes      = require('./event.routes');
const placementRoutes  = require('./placement.routes');
const gigRoutes        = require('./gig.routes');
const skillSwapRoutes  = require('./skillswap.routes');
const gamingRoutes     = require('./gaming.routes');
const rentalRoutes     = require('./rental.routes');

router.use('/auth',       authRoutes);
router.use('/students',   studentRoutes);
router.use('/events',     eventRoutes);
router.use('/placements', placementRoutes);
router.use('/gigs',       gigRoutes);
router.use('/skill-swap', skillSwapRoutes);
router.use('/gaming',     gamingRoutes);
router.use('/rentals',    rentalRoutes);

router.get('/health', (req, res) => {
  res.json({ success: true, message: 'API running', timestamp: new Date().toISOString() });
});

module.exports = router;
