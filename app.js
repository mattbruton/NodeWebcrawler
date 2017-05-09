require('dotenv').config();
const express = require('express');
const cheerio = require('cheerio');
const path = require('path');
const request = require('request');

const app = express();

var url = 'http://google.com';

// request(url, function (err, res, body) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(body);
//     }
// });

const sendPage = () => {
    return new Promise((resolve, reject) => {
        request(url, function (err, res, body) {
            if (err) {
                reject(console.log(err));
            } else {
                resolve(body);
            }
        });
    })
}

app.get('/page', function (req, res) {
    sendPage().then(response => {
        res.send(response);
    });
});

app.use('/', express.static(path.join(__dirname, 'public')));


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});