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
    console.log(req.body);
    const course = new Course(req.body.title, req.body.price, req.body.img);
    await course.save();
    res.redirect('/courses');
})

module.exports = router;