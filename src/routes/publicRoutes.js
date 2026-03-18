const express = require('express');
const router = express.Router();
const { getOverview, getMatchCenter } = require('../controllers/publicController');

router.get('/overview', getOverview);
router.get('/matches', getMatchCenter);

module.exports = router;
