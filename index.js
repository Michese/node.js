'use strict'
const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {

    fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
        try {
            if (err) {
                throw err;
            }
            res.write(Buffer.from(data).toString(), err2 => {
                try {
                    if (err2) {
                        throw err2;
                    }
                } catch {
                    console.error(err2.message);
                }
            });
            res.end();
        } catch {
            console.error(err.message);
        }
    });


})

server.listen(3085, () => {
    console.log('Server is runner ...');
})