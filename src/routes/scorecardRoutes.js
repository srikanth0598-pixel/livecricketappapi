const express = require('express');
const router = express.Router();
const { createScorecard, getAllScorecards, getScorecardById, updateScorecard, deleteScorecard } = require('../controllers/scorecardController');

router.get('/', getAllScorecards);
router.post('/', createScorecard);
router.get('/:id', getScorecardById);
router.put('/:id', updateScorecard);
router.delete('/:id', deleteScorecard);

module.exports = router;
