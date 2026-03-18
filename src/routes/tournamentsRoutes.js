const express = require('express');
const router = express.Router();

const { createTournament, getAllTournaments } = require('../controllers/tournamentsController');
const { protect, requireRoles } = require('../middlewares/auth');

router.use(protect, requireRoles('admin', 'scorer'));

router.post('/', createTournament);
router.get('/', getAllTournaments);

module.exports = router;
