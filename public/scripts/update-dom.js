export const createIFrame = (html, parent) => {
  let iframe = document.createElement('iframe');
  iframe.setAttribute('srcdoc', html);
  iframe.setAttribute('class', 'remote__iframe');
  if (document.querySelector('iframe')) {
    parent.removeChild(document.querySelector('iframe'));
  }
  parent.appendChild(iframe);
};

export const CreateResultsNotification = (results, domain, parent) => {
  let h3 = document.createElement('h3');
  h3.innerHTML = `Found ${results.length} remote urls on ${domain}!`;
  if (parent.querySelector('h3')){
    parent.removeChild(document.querySelector('h3'));
  }
  parent.appendChild(h3);
};