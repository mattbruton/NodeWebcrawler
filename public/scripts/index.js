import * as Parser from './url-parser.js';

const button = document.getElementById('btn');
const userInput = document.getElementById('url-input');
const resultsContainer = document.getElementById('container__results');

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

const createIFrame = (html) => {
    let iframe = document.createElement('iframe');
    iframe.setAttribute('srcdoc', html);
    iframe.setAttribute('height', '400px')
    iframe.setAttribute('width', '800px');
    if (document.querySelector('iframe')) {
      resultsContainer.removeChild(document.querySelector('iframe'));
    }
    resultsContainer.appendChild(iframe);
};

button.addEventListener('click', () => {
  fetchPage(userInput.value)
  .then(response => {
    createIFrame(response)
    Parser.findAllUrls(response)
    return response;
  })
  .then(data => console.log(data))
});

