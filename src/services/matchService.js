const Match = require('../models/matchModel');

const populateFields = [
  { path: 'tournamentId', select: 'name' },
  { path: 'teamA', select: 'teamName village' },
  { path: 'teamB', select: 'teamName village' },
  { path: 'tossWinner', select: 'teamName' },
  { path: 'battingTeam', select: 'teamName' },
  { path: 'bowlingTeam', select: 'teamName' },
];

class MatchService {
  async createMatch(data) {
    const match = await Match.create(data);
    if (!match) throw new Error('Match creation failed');
    return match;
  }

  async getAllMatches() {
    return await Match.find().populate(populateFields);
  }

  async getMatchById(id) {
    const match = await Match.findById(id).populate(populateFields);
    if (!match) throw new Error('Match not found');
    return match;
  }

  async updateMatch(id, data) {
    const match = await Match.findByIdAndUpdate(id, { $set: data }, { new: true }).populate(populateFields);
    if (!match) throw new Error('Match not found');
    return match;
  }

  async deleteMatch(id) {
    const match = await Match.findByIdAndDelete(id);
    if (!match) throw new Error('Match not found');
    return match;
  }
}

module.exports = new MatchService();
