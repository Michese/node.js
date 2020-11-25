const { Router } = require('express');
const router = Router();
const User = require('../models/User');

router.get('/login', (req, res) => {
    res.render('auth/login', {
        title: 'Авторизация',
        isLogin: true
    })
})

router.post('/login', async (req, res) => {
    const {email, password} = req.body;
    const candidate = await User.findOne({email, password});
    if(candidate) {
        req.session.user = candidate;
        req.session.isAuthorization = true;
        res.redirect('/');
    } else {
        res.redirect('/auth/login#login');
    }
})

router.post('/register', (req, res) => {
    const { email, name, password, confirm } = req.body;
    User.findOne({ email }).then((candidate) => {
        if(!candidate) {
            throw 'Такого пользователя нет';
        }

        res.redirect('/auth/login#register');
    }).catch(() => {
        const user = new User({
            name,
            email,
            password,
            cart: { items: [] }
        });
        user.save(() => {
            res.redirect('/auth/login#login');
        });
    })
})

router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/auth/login#login');
    });
})

module.exports = router;