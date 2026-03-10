const mongoose = require('mongoose');

const scorecardSchema = new mongoose.Schema({
  matchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Match', required: true },
  battingTeam: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
  totalRuns: { type: Number, default: 0 },
  wickets: { type: Number, default: 0 },
  overs: { type: Number, default: 0 },
  balls: { type: Number, default: 0 },
  currentBatsman: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
  currentBowler: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
}, { timestamps: true });

module.exports = mongoose.model('Scorecard', scorecardSchema);
