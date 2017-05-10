require('dotenv').config();
const express = require('express');
const cheerio = require('cheerio');
const path = require('path');
const request = require('request');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let url;

const fetchPage = (url) => {
    return new Promise((resolve, reject) => {
        request(url, function (err, res, body) {
            if (err) {
                reject(console.log(err));
            } else {
                resolve(body);
            }
        });
    });
};

app.get('/page', ((req, res) => {
    res.send(console.log(`The current URL being crawled is ${url}.`));
}));

app.post('/newUrl', function (req, res) {
    if (req.body.url) {
        url = req.body.url;
        fetchPage(url).then(response => {
            res.send(response);
        })
    } else {
        res.send(console.log(`Recieved a post request, but wasn't valid.`))
    }
});

app.use('/', express.static(path.join(__dirname, 'public')));
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
