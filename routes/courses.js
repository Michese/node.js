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

router.get('/:id', async (req, res) => {
    const course = await Course.getCourseById(req.params.id);
    res.render('course', {
        layout: 'course',
        title: `Курс ${course.title}`,
        course: course
    });
})

router.get('/:id/edit', async (req, res) => {
    if(!req.query.allow) {
        return redirect('/');
    }
    const course = await Course.getCourseById(req.params.id);
    res.render('edit-course', {
        title: course.title,
        course: course
    });
})

router.post('/edit', async (req, res) => {
    await Course.update(req.body);
    res.redirect('/courses');
})

module.exports = router;