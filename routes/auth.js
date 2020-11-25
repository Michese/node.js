const {Router} = require('express');
const router = Router();

router.get('/login', (req, res) => {
    res.render('auth/login', {
        title: 'Авторизация',
        isLogin: true
    })
})

router.post('/login', (req, res) => {
    req.session.isAuthorization = true;
    res.redirect('/');
})

router.post('/register', (req, res) => {
    res.redirect('/');
})

router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/auth/login#login');
    });
})

module.exports = router;