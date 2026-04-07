// server/src/routes/placement.routes.js
const express = require('express');
const placementController = require('../controllers/placement.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

router.use(authMiddleware);
router.get('/', placementController.getPlacements);
router.post('/', placementController.createPlacement);

module.exports = router;