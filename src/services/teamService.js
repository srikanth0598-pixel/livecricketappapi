const teamModel = require('../models/teamModel');

class TeamService {
    async createTeam(data) {
        const { teamName, village, captain, createdBy } = data;
        const team = await teamModel.create({
            teamName,
            village,
            captain,
            createdBy
        });
        if (!team) throw new Error('Team creation failed');
        return team;

    }    
    
    async getAllTeams() {
        return await teamModel.find().populate('createdBy', 'name email').populate('players');
    }

}

module.exports = new TeamService();