const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const app = express();
const addRouter = require('./routes/add');
const aboutRouter = require('./routes/about');
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

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended:false}));
app.use('/add',addRouter)
app.use('/about',aboutRouter);
app.use('/',homeRouter);
app.use('/courses',coursesRouter);
app.use('/card', cardRouter);

const PORT = process.env.PORT || 3085;

const password = 'qwer1234';
const url = `mongodb+srv://michese:${password}@cluster0.iotf0.mongodb.net/<dbname>?retryWrites=true&w=majority`

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}!`);
})