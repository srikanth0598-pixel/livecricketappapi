const mongoose = require('mongoose');

const ballSchema = new mongoose.Schema({
  matchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Match', required: true },
  over: { type: Number, required: true },
  ball: { type: Number, required: true },
  runs: { type: Number, default: 0 },
  extras: { type: Number, default: 0 },
  wicket: { type: Boolean, default: false },
  batsman: { type: mongoose.Schema.Types.ObjectId, ref: 'Player', required: true },
  bowler: { type: mongoose.Schema.Types.ObjectId, ref: 'Player', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Ball', ballSchema);
