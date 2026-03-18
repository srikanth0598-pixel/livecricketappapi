const express = require('express');
const router = express.Router();

const { createTeam, getAllTeams } = require('../controllers/teamController');
const { protect, requireRoles } = require('../middlewares/auth');

router.use(protect, requireRoles('admin', 'scorer'));

router.post('/', createTeam);
router.get('/', getAllTeams);

module.exports = router;
