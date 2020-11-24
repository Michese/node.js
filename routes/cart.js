const { Router } = require('express');
const router = Router();
const Course = require('../models/Course');

const mapCartItems = (cart) => {
    return cart.items.map(item => ({
        ...item.courseId._doc, count: item.count
    }))
}

router.get('/', async (req, res) => {
    const user = await req.user
        .populate('cart.items.courseId')
        .execPopulate();
    const courses = mapCartItems(user.cart);
    const totalPrice = courses.reduce((total, course) => {
        total += course.count * course.price;
        return total;
    }, 0);
    res.render('cart', {
        title: 'Корзина',
        isCard: true,
        courses,
        price: totalPrice
    })
})

router.post('/add', (req, res) => {
    Course.findById(req.body.id).then(async (course) => {
        try {
            await req.user.addToCart(course);
            res.redirect('/cart');
        } catch (exp) {
            console.log(exp);
        }
    })
})

router.delete('/remove/:id', async (req, res) => {
    const card = await Card.remove(req.params.id);
    res.json(card);
})

module.exports = router;