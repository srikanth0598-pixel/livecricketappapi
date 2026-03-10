const mongoose = require('mongoose');
const teamSchema = new mongoose.Schema({
  teamName: { type: String, required: true },
  village: { type: String, required: true },
  captain: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

teamSchema.virtual('players', {
  ref: 'Player',
  localField: '_id',
  foreignField: 'teamId',
});

module.exports = mongoose.model('Team', teamSchema);