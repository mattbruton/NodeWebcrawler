import * as Parser from './url-parser.js';
import * as UpdateDOM from './update-dom.js';

const button = document.getElementById('btn');
const userInput = document.getElementById('url-input');
const resultsContainer = document.getElementById('container__results');

const dataForTable = [];

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
  fetchPage(userInput.value)
    .then(response => {
      UpdateDOM.createIFrame(response, resultsContainer)
      return Parser.findAllUrls(response)
    })
    .then(data => Parser.subDomainHelper(data))
    .then(data => Parser.filterDomainsFromRoot(data, getRootDomainForUserInput()))
    .then(data => Parser.filterUndefined(data))
    .then(data => {
      CreateResultsNotification(data, userInput.value);
      dataForTable.push({url: `${getRootDomainForUserInput()}, totalRemoteUrls: ${data.length}`});
      // console.log(Parser.removeDuplicateUrls(data));
    });  
});

const CreateResultsNotification = (results, domain) => {
  let h3 = document.createElement('h3');
  h3.innerHTML = `Found ${results.length} remote urls on ${domain}!`;
  if (resultsContainer.querySelector('h3')){
    resultsContainer.removeChild(document.querySelector('h3'));
  }
  resultsContainer.appendChild(h3);
};