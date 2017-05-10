let button = document.getElementById('btn');

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

button.addEventListener('click', () => {
  fetchPage("http://reddit.com")
    .then(response => {
      var iframe = document.createElement('iframe');
      iframe.setAttribute('srcdoc', response);
      iframe.setAttribute('height', '400px')
      iframe.setAttribute('width', '800px');
      document.getElementById('container__results').appendChild(iframe);
    });
});

