const { Schema, model } = require('mongoose');

const userSchema = Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cart: {
        items: [{
            count: {
                type: Number,
                required: true,
                default: 1
            },
            courseId: {
                type: Schema.Types.ObjectId,
                ref: 'Course',
                required: true
            }
        }]
    }
});

userSchema.methods.addToCart = function (course) {
    let items = [...this.cart.items];
    const idx = items.findIndex(c => c.courseId.toString() === course._id.toString());
    if (idx >= 0) {
        items[idx].count++;
    } else {
        items.push({ courseId: course._id });
    }
    this.cart = { items };
    return this.save();
}

userSchema.methods.removeFromCart = function (id) {
    let items = [...this.cart.items];
    const idx = items.findIndex(item => item.courseId == id);
    if (items[idx].count > 1) {
        items[idx].count--;
    } else {
        items = items.filter(item => item.courseId != id);
    }
    this.cart = { items };
    return this.save();
}

userSchema.methods.clearCart = function () {
    this.cart = { items: [] };
    return this.save();
}

module.exports = model('User', userSchema);