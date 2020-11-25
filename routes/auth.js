const {Router} = require('express');
const router = Router();
const User = require('../models/User');

router.get('/login', (req, res) => {
    res.render('auth/login', {
        title: 'Авторизация',
        isLogin: true
    })
})

router.post('/login', async (req, res) => {
    const user = await User.findById('5fbcb68ee9b8b405e81d808d').populate('courseId');
    try {
        req.session.user = user;
        req.session.isAuthorization = true;
        req.session.save((err) => {
            if(err) {
                throw err;
            }
    
            res.redirect('/');
        });
    } catch(err) {
        console.error(err);
    }


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