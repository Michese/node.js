'use strict'
const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html' });

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
    }
    else if (req.method === 'POST') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8'});
        const body = [];
        req.on('data', data => {
            body.push(Buffer.from(data));
        })
        req.on('end', () => {
            const message = body.toString().split('=')[0];
            console.log(message);
            res.end(`<h1>Ваше сообщение: ${message}</h1>`)
        })

    }
})

server.listen(3085, () => {
    console.log('Server is runner ...');
})