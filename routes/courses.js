const { Router } = require('express');
const router = Router();
const Course = require('../models/Course');
const auth = require('../middleware/auth');

router.get('/', (req, res) => {
    Course.find({}).then(courses => {
        res.render('courses', {
            title: "Курсы",
            isCourses: true,
            courses: courses.map(course => {
                const courseObj = course.toObject();
                return courseObj;
            })
        })
    }).catch(err => {
        console.error('Ошибка');
        res.redirect('/');
    })
})

router.get('/:id', (req, res) => {
    Course.findById(req.params.id).then((course) => {
        res.render('course', {
            layout: 'course',
            course: course.toJSON()
        });
    })

})

router.get('/:id/edit', auth, async (req, res) => {
    if (!req.query.allow) {
        return redirect('/');
    }
    Course.findById(req.params.id).then(course => {
        res.render('edit-course', {
            title: course.title,
            course: course.toJSON()
        });
    })
})

router.post('/edit', auth, async (req, res) => {
    const { id } = req.body;
    delete req.body.id;
    await Course.findByIdAndUpdate(id, req.body);
    res.redirect('/courses');
})

router.post('/remove', auth, async (req, res) => {
    await Course.findByIdAndRemove(req.body.id);
    res.redirect('/courses');
})

module.exports = router;