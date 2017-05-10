const scrape = require('website-scraper');
var fs = require('fs'),
    _ = require('underscore');

let options = {
    urls: ['http://google.com/'],
    directory: './scrapedPage',
};


clearDirThenScrape('./scrapedPage');


const rmDir = function (dirPath, removeSelf) {
    if (removeSelf === undefined)
        removeSelf = true;
    try { var files = fs.readdirSync(dirPath); }
    catch (e) { return; }
    if (files.length > 0)
        for (var i = 0; i < files.length; i++) {
            var filePath = dirPath + '/' + files[i];
            if (fs.statSync(filePath).isFile())
                fs.unlinkSync(filePath);
            else
                rmDir(filePath);
        }
    if (removeSelf)
        fs.rmdirSync(dirPath);
};

const removeDirHelper = (dir) => {
    return new Promise((resolve, reject) => {
        rmDir(dir);
        resolve(`Cleared ${dir}`);
    });
};


const clearDirThenScrape = (dir) => {
    removeDirHelper(dir)
        .then(allClear => {
            scrape(options).then((result) => {
                console.log(`${options.urls[0]} successfully scraped!`);
            }).catch((err) => {
                console.log(`Failed to scrape ${options.urls[0]}`, err);
            });
            console.log(allClear);            
        });
};