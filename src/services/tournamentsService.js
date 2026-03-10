const tournamentsModel = require('../models/tournamentsModel');

class TournamentsService {
    async createTournament(data) {
        const { name, location, startDate, endDate, organizer, teams } = data;
        const tournament = await tournamentsModel.create({
            name,
            location,
            startDate,
            endDate,
            organizer,
            teams
        });
        if (!tournament) throw new Error('Tournament creation failed');
        return tournament;
    }

    async getAllTournaments() {
        return await tournamentsModel.find().populate('teams');
    }
}

module.exports = new TournamentsService();      
           