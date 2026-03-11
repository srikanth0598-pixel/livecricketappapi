const ballService = require('../services/ballService');

exports.createBall = async (req, res, next) => {
  try {
    const ball = await ballService.createBall(req.body);
    res.status(201).json({ success: true, data: ball });
  } catch (err) {
    next(err);
  }
};

exports.getAllBalls = async (req, res, next) => {
  try {
    const balls = await ballService.getAllBalls();
    res.status(200).json({ success: true, data: balls });
  } catch (err) {
    next(err);
  }
};

exports.getBallById = async (req, res, next) => {
  try {
    const ball = await ballService.getBallById(req.params.id);
    res.status(200).json({ success: true, data: ball });
  } catch (err) {
    next(err);
  }
};

exports.updateBall = async (req, res, next) => {
  try {
    const ball = await ballService.updateBall(req.params.id, req.body);
    res.status(200).json({ success: true, data: ball });
  } catch (err) {
    next(err);
  }
};

exports.deleteBall = async (req, res, next) => {
  try {
    const ball = await ballService.deleteBall(req.params.id);
    res.status(200).json({ success: true, message: 'Ball deleted successfully' });
  } catch (err) {
    next(err);
  }
};
