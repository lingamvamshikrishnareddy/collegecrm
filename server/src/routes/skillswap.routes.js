// server/src/routes/skillswap.routes.js
const express = require('express');
const skillSwapController = require('../controllers/skillswap.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

router.use(authMiddleware);

router.get('/', skillSwapController.listSwaps);
router.get('/my', skillSwapController.getMySwaps);
router.get('/:id', skillSwapController.getSwap);
router.post('/', skillSwapController.createSwap);
router.put('/:id', skillSwapController.updateSwap);
router.delete('/:id', skillSwapController.deleteSwap);

module.exports = router;
