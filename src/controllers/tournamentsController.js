const tournamentsService = require('../services/tournamentsService');

exports.createTournament = async (req, res, next) => {
    try {
        const tournament = await tournamentsService.createTournament(req.body);
        res.status(201).json({ success: true, data: tournament });
    } catch (err) {
        next(err);
    }
};


exports.getAllTournaments = async (req, res, next) => {
    try {
        const tournaments = await tournamentsService.getAllTournaments();
        res.status(200).json({ success: true, data: tournaments });   
    } catch (err) {
        next(err);
    }
};