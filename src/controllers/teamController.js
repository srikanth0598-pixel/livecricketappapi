const teamService = require('../services/teamService');

exports.createTeam = async (req, res, next) => {
    try {
        const team = await teamService.createTeam(req.body);
        res.status(201).json({ success: true, data: team });
    } catch (err) {
        next(err);
    }
};


exports.getAllTeams = async (req, res, next) => {
    try {
        const teams = await teamService.getAllTeams();
        res.status(200).json({ success: true, data: teams });   
    } catch (err) {
        next(err);
    }
};