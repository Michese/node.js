const fs = require('fs');
const path = require('path');
const uuid = require('uuid')
const { resolve } = require('path');
const { rejects } = require('assert');
const { runInThisContext } = require('vm');

class Course {
    constructor(title, price, img) {
        this.title = title;
        this.price = price;
        this.img = img;
        this.id = uuid.v4();
    }

    getCourse() {
        return {
            title: this.title,
            price: this.price,
            img: this.img,
            id: this.id
        };
    }

    static async update(course) {
        const courses = await Course.getAll();
        const idx = courses.findIndex(c => c.id === course.id);
        courses[idx] = course;
        return new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'courses.json'),
                JSON.stringify(courses),
                err => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                }
            )
        })
    }

    async save() {
        const courses = await Course.getAll();
        courses.push(this.getCourse());
        return new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'courses.json'),
                JSON.stringify(courses),
                err => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                }
            )
        })
    }

    static async getCourseById(id) {
        const courses = await this.getAll();
        const course = courses.find(c => c.id === id)
        // console.lo
        return course;
    }

    static getAll() {
        return new Promise((resolve, reject) => {
            fs.readFile(
                path.join(__dirname, '..', 'data', 'courses.json'),
                'utf-8',
                (err, content) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(JSON.parse(content));
                    }
                }
            )
        })
    }
}

module.exports = Course;