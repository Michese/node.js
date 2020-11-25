const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const MongoStore = require('connect-mongodb-session')(session);
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const addRouter = require('./routes/add');
const aboutRouter = require('./routes/about');
const cartRouter = require('./routes/cart');
const coursesRouter = require('./routes/courses');
const ordersRouter = require('./routes/orders')
const homeRouter = require('./routes/home');
const varMiddleware = require('./middleware/variables');
const authRouter = require('./routes/auth');
const hbs = exphbs.create({
    allowedProtoProperties: true,
    allowProtoMethodsByDefault: true,
    defaultLayout: 'main',
    extname: 'hbs'
})

const MONGODB_URI = 'mongodb+srv://admin:qwer1234@cluster0.iotf0.mongodb.net/shop';

const store = MongoStore({
    collection: 'session',
    uri: MONGODB_URI
})
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: "Hello, world!",
    resave: false,
    saveUninitialized: false,
    store
}))
app.use(varMiddleware);

app.use('/add', addRouter);
app.use('/about', aboutRouter);
app.use('/', homeRouter);
app.use('/courses', coursesRouter);
app.use('/cart', cartRouter);
app.use('/orders', ordersRouter);
app.use('/auth', authRouter);

const PORT = process.env.PORT || 3085;
async function start() {
    try {

        await mongoose.connect(MONGODB_URI, {
            useFindAndModify: false,
            useNewUrlParser: true,
             useUnifiedTopology: true 
            });

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}!`);
        })
    } catch (err) {
        console.log(err);
    }
}

start();