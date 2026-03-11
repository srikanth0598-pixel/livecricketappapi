const Ball = require('../models/ballModel');

const populateFields = [
  { path: 'matchId' },
  { path: 'batsman', select: 'name position' },
  { path: 'bowler', select: 'name position' },
];

class BallService {
  async createBall(data) {
    const ball = await Ball.create(data);
    if (!ball) throw new Error('Ball creation failed');
    return ball;
  }

  async getAllBalls() {
    return await Ball.find().populate(populateFields);
  }

  async getBallById(id) {
    const ball = await Ball.findById(id).populate(populateFields);
    if (!ball) throw new Error('Ball not found');
    return ball;
  }

  async updateBall(id, data) {
    const ball = await Ball.findByIdAndUpdate(id, { $set: data }, { new: true }).populate(populateFields);
    if (!ball) throw new Error('Ball not found');
    return ball;
  }

  async deleteBall(id) {
    const ball = await Ball.findByIdAndDelete(id);
    if (!ball) throw new Error('Ball not found');
    return ball;
  }
}

module.exports = new BallService();
