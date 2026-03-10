const express = require('express');
const router = express.Router();

const { createTournament, getAllTournaments } = require('../controllers/tournamentsController');
router.post('/', createTournament);
router.get('/', getAllTournaments);

module.exports = router;