const publicService = require('../services/publicService');

exports.getOverview = async (req, res, next) => {
  try {
    const overview = await publicService.getOverview();
    res.status(200).json({ success: true, data: overview });
  } catch (error) {
    next(error);
  }
};

exports.getMatchCenter = async (req, res, next) => {
  try {
    const matches = await publicService.getMatchCenter(req.query.status);
    res.status(200).json({ success: true, data: matches });
  } catch (error) {
    next(error);
  }
};
