const { Router } = require('express');
const router = Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

router.get('/login', (req, res) => {
    res.render('auth/login', {
        title: 'Авторизация',
        isLogin: true,
        loginError: req.flash('loginError'),
        registerError: req.flash('registerError')
    })
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const candidate = await User.findOne({ email });
    if (candidate) {
        const areSame = await bcrypt.compare(password, candidate.password);
        if (areSame) {
            req.session.user = candidate;
            req.session.isAuthorization = true;

            res.redirect('/');
        } else {
            req.flash('loginError', 'Неверный пароль');
            res.redirect('/auth/login#login');
        }
    } else {
        req.flash('loginError', 'Пользователя с таким email не существует');
        res.redirect('/auth/login#login');
    }
})

router.post('/register',  (req, res) => {
    const { email, name, password, confirm } = req.body;
    User.findOne({ email }).then((candidate) => {
        if (!candidate) {
            throw 'Такого пользователя нет';
        }

        req.flash('registerError', 'Пользователь с таким email уже существует');
        res.redirect('/auth/login#register');
    }).catch(async () => {
        const hashPassword = await bcrypt.hash(password, 10);
        const user = new User({
            name,
            email,
            password:hashPassword,
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