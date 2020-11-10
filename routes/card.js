const {Router} = require('express');
const router = Router();
const Card  = require('../models/Card');
const Course = require('../models/Course');

router.get('/', async (req, res) => {
    const card = await Card.fetch();
    res.render('card', {
        title: 'Корзина',
        isCard: true,
        courses: card.courses,
        price: card.price
    })
})

router.post('/add', async (req, res) => {
    const course = await Course.getCourseById(req.body.id);
    await Card.add(course)
    res.redirect('/card');
})

module.exports = router;