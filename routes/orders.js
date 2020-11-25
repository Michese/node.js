const { Router } = require('express');
const router = Router();
const Order = require('../models/Order');
const auth = require('../middleware/auth');

router.get('/', auth, (req, res) => {
    Order.find({ 'user.userId': req.session.user._id }).populate('user.userId').then(orders => {
        res.render('orders', {
            title: 'Заказы',
            isOrders: true,
            orders: orders.map(order => ({
                _id: order._id,
                date: order.date,
                courses: order.courses.map(course => course.toJSON()),
                price: order.courses.reduce((total, course) => (total += course.count * course.course.price), 0)
            }))
        });
    })
});

router.post('/', auth, async (req, res) => {
    const user = await req.user.populate('cart.items.courseId').execPopulate();
    const courses = user.cart.items.map(item => ({
        course: { ...item.courseId._doc },
        count: item.count
    }))

    const order = new Order({
        user: {
            name: req.user.name,
            userId: req.user
        },
        courses
    })

    await order.save();
    req.user.clearCart();
    res.redirect('/orders');
})

module.exports = router;