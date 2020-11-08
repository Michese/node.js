'use strict';
const fs = require('fs');
const path = require('path');

// file system
// fs.mkdir(path.join(__dirname, 'notes'), err => {
//     try {
//         if (err) {
//             throw err;
//         }
//         console.log('Папка была создана');
//     } catch {
//         console.error(err.message);
//     }
// });

// fs.writeFile(
//     path.join(__dirname, 'notes', 'mynotes.txt'),
//     'Hello, world!',
//     (err) => {
//         try {
//             if (err) { throw err; }
//             console.log('Файл был создан!');
//         } catch {
//             console.error(err.message);
//         }

//         fs.appendFile(
//             path.join(__dirname, 'notes', 'mynotes.txt'),
//             ' From append file',
//             (err2) => {
//                 try {
//                     if (err2) { throw err2; }
//                     console.log('Файл был изменен!');
//                 } catch {
//                     console.error(err2.message);
//                 }
//             }
//         )

//         fs.readFile(
//             path.join(__dirname, 'notes', 'mynotes.txt'),
//             (err, data) => {
//                 try {
//                     if(err) {
//                         throw err;
//                     }
//                     console.log(Buffer.from(data).toString());
//                 } catch {
//                     console.error(err.message);
//                 }
//             }
//         )
//     }
// );

fs.rename(
    path.join(__dirname, 'notes', 'mynotes.txt'),
    path.join(__dirname, 'notes', 'notes.txt'),
    err => {
        try {
            if(err) {
                throw err;
            }
            console.log('Файл переименован!');
        } catch {
            console.error(err.message);
        }
    }
)