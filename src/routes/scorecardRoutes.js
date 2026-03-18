const express = require('express');
const router = express.Router();
const { createScorecard, getAllScorecards, getScorecardById, updateScorecard, deleteScorecard } = require('../controllers/scorecardController');
const { protect, requireRoles } = require('../middlewares/auth');

router.use(protect, requireRoles('admin', 'scorer'));

router.get('/', getAllScorecards);
router.post('/', createScorecard);
router.get('/:id', getScorecardById);
router.put('/:id', updateScorecard);
router.delete('/:id', deleteScorecard);

module.exports = router;
