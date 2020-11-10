const path = require('path');
const fs = require('fs');
const { deepStrictEqual } = require('assert');


class Card {
    static async add(course) {
        const card = await Card.fetch();
        const idx = card.courses.findIndex(c => c.id === course.id);
        let candidat = card.courses[idx];

        if (candidat) {
            card.courses[idx].count++;
        } else {
            course.count = 1;
            card.courses.push(course);
        }

        card.price += +course.price;

        return new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'card.json'),
                JSON.stringify(card),
                err => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                })
        })
    }

    static async remove(id) {
        const card = await Card.fetch();
        const idx = card.courses.findIndex(c => c.id === id);

        card.price -= +card.courses[idx].price;
        if(card.courses[idx].count === 1) {
            // Удаляем
            card.courses = card.courses.filter(c => c.id !== id);
        } else {
            // Уменьшаем на единицу
            card.courses[idx].count--;
        }

        return new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'card.json'),
                JSON.stringify(card),
                err => {
                    if(err) {
                        reject(err);
                    } else {
                        resolve(card);
                    }
                }
            )
        })
    }

    static async fetch() {
        return new Promise((resolve, reject) => {
            fs.readFile(
                path.join(__dirname, '..', 'data', 'card.json'),
                'utf-8',
                (err, content) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(JSON.parse(content));
                    }
                })
        })
    }
}

module.exports = Card;