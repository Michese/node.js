const {Router} = require('express');
const router = Router();
const Course = require('../models/Course');

router.get('/', (req, res) => {
    // const courses = await Course.getAll();
    // const courses = await Course.findById("5fb800bda4a26a343cb7217c");
    Course.find({}).then(courses => {
        res.render('courses', {
            title: "Курсы",
            isCourses: true,
            courses: courses.map(course => course.toJSON())
        })
    }).catch(err => {
        console.error('Ошибка');
        res.redirect('/');
    })
})

router.get('/:id', (req, res) => {
    Course.findById(req.params.id).then((course)=>{
        res.render('course', {
            layout: 'course',
            course: course.toJSON()
        });
    })

})

router.get('/:id/edit', async (req, res) => {
    if(!req.query.allow) {
        return redirect('/');
    }
    Course.findById(req.params.id).then(course => {
        res.render('edit-course', {
            title: course.title,
            course: course.toJSON()
        });
    })
})

router.post('/edit', async (req, res) => {
    const {id} = req.body;
    delete req.body.id;
    await Course.findByIdAndUpdate(id, req.body);
    res.redirect('/courses');
})

router.post('/remove', async(req, res) => {
    await Course.findByIdAndRemove(req.body.id);
    res.redirect('/courses');
})

module.exports = router;