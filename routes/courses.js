const {Router} = require('express');
const router = Router();
const Course = require('../models/Course');

router.get('/', async (req, res) => {
    const coursest = await Course.getAll();
    res.render('courses', {
        title: 'Курсы',
        isCourses: true,
        courses: coursest
    });
})

module.exports = router;