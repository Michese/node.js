const { Router } = require('express');
const router = Router();
const Course = require('../models/Course');

const mapCartItems = (cart) => {
    return cart.items.map(item => ({
        ...item.courseId._doc, id:item.courseId.id, count: item.count
    }))
}

const calcPrice = (courses) => {
    return courses.reduce((total, course) => {
        total += course.count * course.price;
        return total;
    }, 0);
}

router.get('/', async (req, res) => {
    const user = await req.user
        .populate('cart.items.courseId')
        .execPopulate();
    const courses = mapCartItems(user.cart);

    res.render('cart', {
        title: 'Корзина',
        isCard: true,
        courses,
        price: calcPrice(courses)
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
    await req.user.removeFromCart(req.params.id);
    const user = await req.user.populate('cart.items.courseId').execPopulate();
    const courses = mapCartItems(user.cart);
    const cart =  {
        courses,
        price: calcPrice(courses)
    }
    res.json(cart);
})

module.exports = router;