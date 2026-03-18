const express = require('express');
const router = express.Router();

const { createPlayer, getAllPlayers } = require('../controllers/playerController');
const { protect, requireRoles } = require('../middlewares/auth');

router.use(protect, requireRoles('admin', 'scorer'));

router.post('/', createPlayer);
router.get('/', getAllPlayers);

module.exports = router;
