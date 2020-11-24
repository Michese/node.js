const {Schema, model, SchemaType} = require('mongoose');

const courseSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    img: String,
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

courseSchema.method('toClient', function() {
    console.log('toClient');
    const course = this.toObject();
    course.id = course._id;
    delete course._id;
    return course;
})

module.exports = model('Course', courseSchema);