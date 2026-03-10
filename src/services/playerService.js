const playerModel = require('../models/playerModel');

class PlayerService {
    async createPlayer(data) {
        const { name, age, position, teamId } = data;
        const player = await playerModel.create({
            name,
            age,
            position,
            teamId,
            battingStyle: data.battingStyle || '',
            bowlingStyle: data.bowlingStyle || ''
        });
        if (!player) throw new Error('Player creation failed');
        return player;
    }

    async getAllPlayers() {
        return await playerModel.find().populate('teamId', 'teamName');
    }
}
 

module.exports = new PlayerService();