module.exports = function(req, res, next) {
    if(!req.session.isAuthorization) {
        res.redirect('/auth/login#login');
    }

    next();
}