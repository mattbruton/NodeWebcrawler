import * as Parser from './url-parser.js';
import * as UpdateDOM from './update-dom.js';
import * as Validator from './validator.js';

const button = document.getElementById('btn');
const resume = document.querySelector('#resume');
const pause = document.querySelector('#pause');
const userInput = document.getElementById('url-input');
const resultsContainer = document.getElementById('container__results');
const buttonContainer = document.getElementById('container__button');

let dataForTable = [];
let previouslySearchedUrls = [];
let domainsToScrape = [];
let isPaused = false;


const fetchPage = (fetchThis) => {
  return new Promise((resolve, reject) => {
    fetch('./newUrl',
      {
        method: 'post',
        headers: {
          'Accept': 'application/json, text/html, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: fetchThis })
      })
      .then(res => res.text()).then(data => {
        resolve(data);
      });
  });
};

resume.addEventListener(('click'), () => {
  resultsContainer.innerHTML = "";
  isPaused = false;
  button.innerText = "Resume";
})

pause.addEventListener(('click'), () => {
  resultsContainer.innerHTML = "";
  isPaused = true;
  UpdateDOM.CreateResultsTable(resultsContainer);
  UpdateDOM.CreateDecendingTableRows(dataForTable, document.querySelector('table'));
});

button.addEventListener('click', () => {
  resultsContainer.innerHTML = "";
  if (Validator.checkUserInputForValidUrl(userInput.value)) {
    scrapePage(getRootDomainForUserInput);
  } else {
    console.log(`That doesn't appear to be a valid URL. Try again?`);
  };
  button.setAttribute('disable', 'disable');
});

const scrapePage = (url) => {
  previouslySearchedUrls.push(getRootDomainForUserInput());
  fetchPage(Validator.validateInput(userInput.value))
    .then(response => {
      UpdateDOM.createIFrame(response, resultsContainer);
      return Parser.findAllUrls(response);
    })
    .then(data => Parser.subDomainHelper(data))
    .then(data => Parser.filterDomainsFromRoot(data, getRootDomainForUserInput()))
    .then(data => Parser.filterUndefined(data))
    .then(data => {
      UpdateDOM.CreateResultsNotification(data, userInput.value, resultsContainer);
      dataForTable.push({ url: `${getRootDomainForUserInput()}`, totalRemoteUrls: data.length });
      return Parser.removeDuplicateUrls(data)
        .then(data => {
          let domainsToAdd = data.map(url => {
            if (previouslySearchedUrls.indexOf(url) == -1 && domainsToScrape.indexOf(url) == -1) {
              return url;
            };
          });
          domainsToScrape = domainsToScrape.concat(domainsToAdd);
          return Parser.filterUndefined(domainsToScrape);
        })
        .then(data => {
          userInput.value = domainsToScrape.splice(0, 1);
          checkForNext(isPaused);
        });
    });
};

const getRootDomainForUserInput = () => {
  return Parser.removeSubDomain(userInput.value);
};

const checkForNext = (bool) => {
  if (bool === false) {
    scrapePage(userInput.value);
  };
};