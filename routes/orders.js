const {Router} = require('express');
const router = Router();
const Order = require('../models/Order');

router.get('/', (req, res) => {
    Order.find({'user.userId': req.user._id}).populate('user.userId').then(orders => {
        console.log(orders[0].courses[0].count);
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

router.post('/', async (req, res) => {
    const user = await req.user.populate('cart.items.courseId').execPopulate();
    const courses = user.cart.items.map(item => ({
        course: {...item.courseId._doc},
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