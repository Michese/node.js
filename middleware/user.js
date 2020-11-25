const User = require('../models/User');

module.exports = async function(req, res, next) {
    if(!req.session.isAuthorization) {
        return next();
    }

    req.user = await User.findById(req.session.user._id);
    next();
}