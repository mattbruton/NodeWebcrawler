require('dotenv').config();
const express = require('express');
const cheerio = require('cheerio');
const path = require('path');
const request = require('request');

const app = express();

var url = 'http://google.com';

request(url, function(err, res, body) {
    if(err) {
        console.log(err);
    } else {
        console.log(body);
    }
});

app.get('/console', function(req, res) {
    res.send('Hello World!');
});

app.use('/', express.static(path.join(__dirname, 'public')));


const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});