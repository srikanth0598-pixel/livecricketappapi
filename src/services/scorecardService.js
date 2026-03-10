const Scorecard = require('../models/scorecardModel');

const populateFields = [
  { path: 'matchId' },
  { path: 'battingTeam', select: 'teamName village' },
  { path: 'currentBatsman', select: 'name position' },
  { path: 'currentBowler', select: 'name position' },
];

class ScorecardService {
  async createScorecard(data) {
    const scorecard = await Scorecard.create(data);
    if (!scorecard) throw new Error('Scorecard creation failed');
    return scorecard;
  }

  async getAllScorecards() {
    return await Scorecard.find().populate(populateFields);
  }

  async getScorecardById(id) {
    const scorecard = await Scorecard.findById(id).populate(populateFields);
    if (!scorecard) throw new Error('Scorecard not found');
    return scorecard;
  }

  async updateScorecard(id, data) {
    const scorecard = await Scorecard.findByIdAndUpdate(id, { $set: data }, { new: true }).populate(populateFields);
    if (!scorecard) throw new Error('Scorecard not found');
    return scorecard;
  }

  async deleteScorecard(id) {
    const scorecard = await Scorecard.findByIdAndDelete(id);
    if (!scorecard) throw new Error('Scorecard not found');
    return scorecard;
  }
}

module.exports = new ScorecardService();
