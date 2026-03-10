const express = require('express');
const router = express.Router();

const { createTeam, getAllTeams } = require('../controllers/teamController');
router.post('/', createTeam);
router.get('/', getAllTeams);

module.exports = router;