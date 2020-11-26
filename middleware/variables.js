module.exports = function(req, res, next) {
    res.locals.isAuth = req.session.isAuthorization;
    res.locals.csrf = req.csrfToken();
    next();
}