const ballService = require('../services/ballService');

exports.createBall = async (req, res, next) => {
  try {
    const ball = await ballService.createBall(req.body);
    const io = req.app.get('io');
    if (io) {
      io.emit('ballUpdate', { type: 'create', data: ball });
    }
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
    const io = req.app.get('io');
    if (io) {
      io.emit('ballUpdate', { type: 'update', data: ball });
    }
    res.status(200).json({ success: true, data: ball });
  } catch (err) {
    next(err);
  }
};

exports.deleteBall = async (req, res, next) => {
  try {
    const ball = await ballService.deleteBall(req.params.id);
    const io = req.app.get('io');
    if (io) {
      io.emit('ballUpdate', { type: 'delete', data: { _id: req.params.id, matchId: ball.matchId } });
    }
    res.status(200).json({ success: true, message: 'Ball deleted successfully' });
  } catch (err) {
    next(err);
  }
};
