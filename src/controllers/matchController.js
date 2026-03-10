const matchService = require('../services/matchService');

exports.createMatch = async (req, res, next) => {
  try {
    const match = await matchService.createMatch(req.body);
    res.status(201).json({ success: true, data: match });
  } catch (err) {
    next(err);
  }
};

exports.getAllMatches = async (req, res, next) => {
  try {
    const matches = await matchService.getAllMatches();
    res.status(200).json({ success: true, data: matches });
  } catch (err) {
    next(err);
  }
};

exports.getMatchById = async (req, res, next) => {
  try {
    const match = await matchService.getMatchById(req.params.id);
    res.status(200).json({ success: true, data: match });
  } catch (err) {
    next(err);
  }
};

exports.updateMatch = async (req, res, next) => {
  try {
    const match = await matchService.updateMatch(req.params.id, req.body);
    res.status(200).json({ success: true, data: match });
  } catch (err) {
    next(err);
  }
};

exports.deleteMatch = async (req, res, next) => {
  try {
    const match = await matchService.deleteMatch(req.params.id);
    res.status(200).json({ success: true, message: 'Match deleted successfully' });
  } catch (err) {
    next(err);
  }
};
