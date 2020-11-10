'use strict';
const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const addRouter = require('./routes/add');
const aboutRouter = require('./routes/about')
const coursesRouter = require('./routes/courses');
const homeRouter = require('./routes/home');
const cardRouter = require('./routes/card');

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.static('public'));
app.use(express.urlencoded({extended:false}));
app.use('/add',addRouter);
app.use('/about',aboutRouter);
app.use('/',homeRouter);
app.use('/courses',coursesRouter);
app.use('/card', cardRouter);

const PORT = process.env.PORT || 3085;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}!`);
})