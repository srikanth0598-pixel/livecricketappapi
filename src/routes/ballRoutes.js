const express = require('express');
const router = express.Router();
const { createBall, getAllBalls, getBallById, updateBall, deleteBall } = require('../controllers/ballController');

router.get('/', getAllBalls);
router.post('/', createBall);
router.get('/:id', getBallById);
router.put('/:id', updateBall);
router.delete('/:id', deleteBall);

module.exports = router;
