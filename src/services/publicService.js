const Match = require('../models/matchModel');
const Scorecard = require('../models/scorecardModel');
const Ball = require('../models/ballModel');
const Tournament = require('../models/tournamentsModel');
const Team = require('../models/teamModel');
const Player = require('../models/playerModel');

const matchPopulateFields = [
  { path: 'tournamentId', select: 'name location organizer startDate endDate teams' },
  { path: 'teamA', select: 'teamName village captain' },
  { path: 'teamB', select: 'teamName village captain' },
  { path: 'tossWinner', select: 'teamName' },
  { path: 'battingTeam', select: 'teamName' },
  { path: 'bowlingTeam', select: 'teamName' },
];

const scorecardPopulateFields = [
  { path: 'battingTeam', select: 'teamName village' },
  { path: 'currentBatsman', select: 'name' },
  { path: 'currentBowler', select: 'name' },
];

const ballPopulateFields = [
  { path: 'batsman', select: 'name' },
  { path: 'bowler', select: 'name' },
];

const statusOrder = {
  live: 0,
  upcoming: 1,
  completed: 2,
};

const getId = (value) => {
  if (!value) return null;
  if (typeof value === 'string') return value;
  if (value._id) return String(value._id);
  return String(value);
};

const getSortTime = (match) => {
  const value = match.scheduledAt || match.createdAt;
  return value ? new Date(value).getTime() : 0;
};

const sortMatches = (matches) => {
  return matches.sort((left, right) => {
    const statusDifference = (statusOrder[left.status] ?? 99) - (statusOrder[right.status] ?? 99);
    if (statusDifference !== 0) {
      return statusDifference;
    }

    if (left.status === 'completed') {
      return getSortTime(right) - getSortTime(left);
    }

    return getSortTime(left) - getSortTime(right);
  });
};

const createBallLabel = (ball) => {
  const total = Number(ball.runs || 0) + Number(ball.extras || 0);

  if (ball.wicket) {
    return 'W';
  }

  if (ball.extras) {
    return `${total}+`;
  }

  if (total === 0) {
    return '.';
  }

  return String(total);
};

const serializeTeam = (team) => {
  if (!team) {
    return null;
  }

  return {
    _id: getId(team),
    teamName: team.teamName,
    village: team.village || '',
    captain: team.captain || '',
    playerCount: Array.isArray(team.players) ? team.players.length : undefined,
  };
};

const serializeBall = (ball) => ({
  _id: getId(ball),
  over: ball.over,
  ball: ball.ball,
  runs: ball.runs,
  extras: ball.extras,
  wicket: ball.wicket,
  batsmanName: ball.batsman?.name || '',
  bowlerName: ball.bowler?.name || '',
  label: createBallLabel(ball),
});

const serializeMatch = (match, scorecard, recentBalls) => ({
  _id: getId(match),
  status: match.status,
  oversLimit: match.overs,
  scheduledAt: match.scheduledAt || null,
  venue: match.venue || '',
  matchNote: match.matchNote || '',
  createdAt: match.createdAt,
  updatedAt: match.updatedAt,
  tournament: match.tournamentId
    ? {
        _id: getId(match.tournamentId),
        name: match.tournamentId.name,
        location: match.tournamentId.location || '',
        organizer: match.tournamentId.organizer || '',
        startDate: match.tournamentId.startDate || null,
        endDate: match.tournamentId.endDate || null,
      }
    : null,
  teams: {
    teamA: serializeTeam(match.teamA),
    teamB: serializeTeam(match.teamB),
  },
  tossWinner: match.tossWinner?.teamName || '',
  battingTeam: match.battingTeam?.teamName || '',
  bowlingTeam: match.bowlingTeam?.teamName || '',
  score: scorecard
    ? {
        battingTeamId: getId(scorecard.battingTeam),
        battingTeamName: scorecard.battingTeam?.teamName || '',
        totalRuns: scorecard.totalRuns,
        wickets: scorecard.wickets,
        overs: scorecard.overs,
        balls: scorecard.balls,
        currentBatsman: scorecard.currentBatsman?.name || '',
        currentBowler: scorecard.currentBowler?.name || '',
      }
    : null,
  recentBalls,
});

class PublicService {
  async getMatchCards(status) {
    const matchQuery = status ? { status } : {};

    const matches = await Match.find(matchQuery)
      .populate(matchPopulateFields)
      .lean();

    if (matches.length === 0) {
      return [];
    }

    const matchIds = matches.map((match) => match._id);

    const [scorecards, balls] = await Promise.all([
      Scorecard.find({ matchId: { $in: matchIds } })
        .populate(scorecardPopulateFields)
        .lean(),
      Ball.find({ matchId: { $in: matchIds } })
        .sort({ createdAt: -1, over: -1, ball: -1 })
        .populate(ballPopulateFields)
        .lean(),
    ]);

    const scorecardMap = new Map(scorecards.map((scorecard) => [getId(scorecard.matchId), scorecard]));
    const recentBallsMap = new Map();

    balls.forEach((ball) => {
      const matchId = getId(ball.matchId);
      const existingBalls = recentBallsMap.get(matchId) || [];

      if (existingBalls.length < 6) {
        existingBalls.push(serializeBall(ball));
        recentBallsMap.set(matchId, existingBalls);
      }
    });

    return sortMatches(matches).map((match) =>
      serializeMatch(
        match,
        scorecardMap.get(getId(match)),
        (recentBallsMap.get(getId(match)) || []).reverse()
      )
    );
  }

  async getOverview() {
    const [matchCards, tournaments, teams, playersCount] = await Promise.all([
      this.getMatchCards(),
      Tournament.find().populate('teams', 'teamName village').sort({ startDate: 1 }).lean(),
      Team.find().populate('players', 'name').lean(),
      Player.countDocuments(),
    ]);

    const matchesByTournament = matchCards.reduce((accumulator, match) => {
      const tournamentId = match.tournament?._id;
      if (!tournamentId) {
        return accumulator;
      }

      accumulator[tournamentId] = (accumulator[tournamentId] || 0) + 1;
      return accumulator;
    }, {});

    const liveMatches = matchCards.filter((match) => match.status === 'live');
    const upcomingMatches = matchCards.filter((match) => match.status === 'upcoming');
    const recentResults = matchCards.filter((match) => match.status === 'completed');
    const featuredMatch = liveMatches[0] || upcomingMatches[0] || recentResults[0] || null;

    return {
      stats: {
        totalMatches: matchCards.length,
        liveMatches: liveMatches.length,
        upcomingMatches: upcomingMatches.length,
        tournaments: tournaments.length,
        teams: teams.length,
        players: playersCount,
      },
      featuredMatch,
      liveMatches: liveMatches.slice(0, 6),
      upcomingMatches: upcomingMatches.slice(0, 8),
      recentResults: recentResults.slice(0, 8),
      tournaments: tournaments.map((tournament) => ({
        _id: getId(tournament),
        name: tournament.name,
        location: tournament.location || '',
        organizer: tournament.organizer || '',
        startDate: tournament.startDate || null,
        endDate: tournament.endDate || null,
        teamCount: Array.isArray(tournament.teams) ? tournament.teams.length : 0,
        matchCount: matchesByTournament[getId(tournament)] || 0,
      })),
      teams: teams
        .map((team) => ({
          ...serializeTeam(team),
          createdAt: team.createdAt,
        }))
        .sort((left, right) => (right.playerCount || 0) - (left.playerCount || 0))
        .slice(0, 12),
    };
  }

  async getMatchCenter(status) {
    return {
      matches: await this.getMatchCards(status),
    };
  }
}

module.exports = new PublicService();
