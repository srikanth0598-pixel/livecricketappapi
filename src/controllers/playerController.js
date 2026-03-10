const playerService = require('../services/playerService');

exports.createPlayer = async (req, res, next) => {
    try {
        const player = await playerService.createPlayer(req.body);
        res.status(201).json({ success: true, data: player });
    } catch (err) {
        next(err);
    }
};


exports.getAllPlayers = async (req, res, next) => {
    try {
        const players = await playerService.getAllPlayers();
        res.status(200).json({ success: true, data: players });   
    } catch (err) {
        next(err);
    }
};