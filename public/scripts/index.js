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
      .then(res => res.text())
      .then(res => resolve(res));
  });
};

const createIFrame = (html) => {
  let iframe = document.createElement('iframe');
  iframe.setAttribute('srcdoc', response);
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
      createIFrame(response);
    });
});

