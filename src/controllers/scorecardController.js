const scorecardService = require('../services/scorecardService');

exports.createScorecard = async (req, res, next) => {
  try {
    const scorecard = await scorecardService.createScorecard(req.body);
    // Emit socket event for live updates
    const io = req.app.get('io');
    if (io) {
      io.emit('scorecardUpdate', { type: 'create', data: scorecard });
    }
    res.status(201).json({ success: true, data: scorecard });
  } catch (err) {
    next(err);
  }
};

exports.getAllScorecards = async (req, res, next) => {
  try {
    const scorecards = await scorecardService.getAllScorecards();
    res.status(200).json({ success: true, data: scorecards });
  } catch (err) {
    next(err);
  }
};

exports.getScorecardById = async (req, res, next) => {
  try {
    const scorecard = await scorecardService.getScorecardById(req.params.id);
    res.status(200).json({ success: true, data: scorecard });
  } catch (err) {
    next(err);
  }
};

exports.updateScorecard = async (req, res, next) => {
  try {
    const scorecard = await scorecardService.updateScorecard(req.params.id, req.body);
    // Emit socket event for live updates
    const io = req.app.get('io');
    if (io) {
      io.emit('scorecardUpdate', { type: 'update', data: scorecard });
    }
    res.status(200).json({ success: true, data: scorecard });
  } catch (err) {
    next(err);
  }
};

exports.deleteScorecard = async (req, res, next) => {
  try {
    const scorecard = await scorecardService.deleteScorecard(req.params.id);
    // Emit socket event for live updates
    const io = req.app.get('io');
    if (io) {
      io.emit('scorecardUpdate', { type: 'delete', data: { _id: req.params.id } });
    }
    res.status(200).json({ success: true, message: 'Scorecard deleted successfully' });
  } catch (err) {
    next(err);
  }
};
