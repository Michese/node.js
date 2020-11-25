module.exports = function(req, res, next) {
    if(!req.session.isAuthorization) {
        return res.redirect('/auth/login#login');
    }

    next();
}