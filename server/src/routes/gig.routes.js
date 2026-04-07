// server/src/routes/gig.routes.js
const express = require('express');
const gigController = require('../controllers/gig.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

router.use(authMiddleware);

router.get('/', gigController.listGigs);
router.get('/my', gigController.getMyGigs);
router.get('/portfolio/:userId?', gigController.getPortfolio);
router.get('/:id', gigController.getGig);
router.post('/', gigController.createGig);
router.put('/:id', gigController.updateGig);
router.delete('/:id', gigController.deleteGig);
router.post('/:id/apply', gigController.applyToGig);
router.put('/applications/:applicationId', gigController.updateApplicationStatus);

module.exports = router;
