import * as Parser from './url-parser.js';
import * as UpdateDOM from './update-dom.js';
import * as Validator from './validator.js';

const button = document.getElementById('btn');
const pause = document.getElementById('pause');
const userInput = document.getElementById('url-input');
const resultsContainer = document.getElementById('container__results');

const dataForTable = [];
const domainsToScrape = [];

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
      })
  });
};

const getRootDomainForUserInput = () => {
  return Parser.removeSubDomain(userInput.value);
};

button.addEventListener('click', () => {
  fetchPage(Validator.validateInput(userInput.value))
    .then(response => {
      UpdateDOM.createIFrame(response, resultsContainer)
      return Parser.findAllUrls(response)
    })
    .then(data => Parser.subDomainHelper(data))
    .then(data => Parser.filterDomainsFromRoot(data, getRootDomainForUserInput()))
    .then(data => Parser.filterUndefined(data))
    .then(data => {
      UpdateDOM.CreateResultsNotification(data, userInput.value, resultsContainer);
      dataForTable.push({url: `${getRootDomainForUserInput()}`, totalRemoteUrls: data.length});
      // console.log(Parser.removeDuplicateUrls(data));
    });  
});

pause.addEventListener('click', () => {
  resultsContainer.innerHTML = "";
  UpdateDOM.CreateResultsTable(resultsContainer);
  UpdateDOM.CreateDecendingTableRows(dataForTable, document.querySelector('table'));
});
