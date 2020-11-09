'use strict';
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const app = express();
const addRouter = require('./routes/add');
const aboutRouter = require('./routes/about')
const coursesRouter = require('./routes/courses');
const homeRouter = require('./routes/home');

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');
app.use(express.static('public'))
app.use(addRouter);
app.use(aboutRouter);
app.use(homeRouter);
app.use(coursesRouter);

const PORT = process.env.PORT || 3085;

// app.get('/', (req, res) => {
//     res.render('index', {
//         title: 'Главная страница',
//         isHome: true
//     });
// })

// app.get('/about', (req, res) => {
//     res.render('about', {
//         title: 'О нас',
//         isAbout: true
//     });
// })

// app.get('/courses', (req, res) => {
//     res.render('courses', {
//         title: 'Курсы',
//         isCourses: true
//     });
// })

// app.get('/add', (req, res) => {
//     res.render('add', {
//         title: 'Добавить курс',
//         isAdd: true
//     });
// })

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}!`);
})