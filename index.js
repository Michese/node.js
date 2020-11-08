'use strict'
const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        const url = req.url;

        switch (url) {
            case '/': {
                fs.readFile(
                    path.join(__dirname, 'view', 'index.html'),
                    'utf-8',
                    (err, data) => {
                        try {
                            if (err) {
                                throw err;
                            }
                            res.end(data);
                        } catch {
                            console.error(err.message);
                        }
                    }
                );
                break;
            }
            case '/about': {
                fs.readFile(
                    path.join(__dirname, 'view', 'about.html'),
                    'utf-8',
                    (err, data) => {
                        try {
                            if (err) {
                                throw err;
                            }
                            res.end(data);
                        } catch {
                            console.error(err.message);
                        }
                    }
                );
                break;
            }
            default: {
                fs.readFile(
                    path.join(__dirname, 'view', '404error.html'),
                    'utf-8',
                    (err, data) => {
                        try {
                            if (err) {
                                throw err;
                            }
                            res.end(data);
                        } catch {
                            console.error(err.message);
                        }
                    }
                );
            }
        }
    }
    else if (req.method === 'POST') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        const body = [];
        req.on('data', data => {
            console.log(Buffer.from(data));
            body.push(Buffer.from(data));
        })
        req.on('end', () => {
            const message = body.toString().split('=')[1];
            fs.readFile(
                path.join(__dirname, 'view', 'about.html'),
                'utf-8',
                (err, data) => {
                    try {
                        if (err) {
                            throw err;
                        }
                        res.write(data);
                    } catch {
                        console.error(err.message);
                    }
                    res.end()
                }
            )
        })
    }
})

server.listen(3085, () => {
    console.log('Server is runner ...');
})