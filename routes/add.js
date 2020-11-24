const {Router} = require('express');
const router = Router();
const Course = require('../models/Course');

router.get('/', (req, res) => {
    res.render('add', {
        title: 'Добавить курс',
        isAdd: true
    });
})

router.post('/', async (req, res) => {
    
    const course = new Course({
        title: req.body.title,
        price: req.body.price,
        img: req.body.img,
        userId: req.user
    });
    try {
        await course.save();
        res.redirect('/courses');
    } catch(err) {
        console.error(err);
    }
})

module.exports = router;