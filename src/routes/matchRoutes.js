const express = require('express');
const router = express.Router();
const { createMatch, getAllMatches, getMatchById, updateMatch, deleteMatch } = require('../controllers/matchController');

router.get('/', getAllMatches);
router.post('/', createMatch);
router.get('/:id', getMatchById);
router.put('/:id', updateMatch);
router.delete('/:id', deleteMatch);

module.exports = router;
