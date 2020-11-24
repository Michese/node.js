const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const addRouter = require('./routes/add');
const aboutRouter = require('./routes/about');
const coursesRouter = require('./routes/courses');
const homeRouter = require('./routes/home');
const cardRouter = require('./routes/card');
const User = require('./models/User');
const hbs = exphbs.create({
    allowedProtoProperties: true,
    allowProtoMethodsByDefault: true,
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(async (req, res, next) => {
    try{
        req.user = await User.findById('5fbcb68ee9b8b405e81d808d');
        next();
    } catch(exp) {
        console.error(exp);
    }
})

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use('/add', addRouter);
app.use('/about', aboutRouter);
app.use('/', homeRouter);
app.use('/courses', coursesRouter);
app.use('/card', cardRouter);

const PORT = process.env.PORT || 3085;
async function start() {
    try {
        const password = 'qwer1234';
        const url = `mongodb+srv://admin:${password}@cluster0.iotf0.mongodb.net/shop`;

        await mongoose.connect(url, {
            useFindAndModify: false,
            useNewUrlParser: true,
             useUnifiedTopology: true 
            });
        const candidate = await User.findOne();
        if(!candidate) {
            const user = new User({
                name: 'Michse',
                email: 'michese@mail.ru',
                cart: {
                    items: []
                }
            })
            await user.save();
        }

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}!`);
        })
    } catch (err) {
        console.log(err);
    }
}

start();