// server/src/routes/rental.routes.js
const express = require('express');
const rentalController = require('../controllers/rental.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

router.use(authMiddleware);

router.get('/', rentalController.listRentals);
router.get('/:id', rentalController.getRental);
router.post('/', rentalController.createRental);
router.post('/expire', rentalController.expireRentals);

module.exports = router;
