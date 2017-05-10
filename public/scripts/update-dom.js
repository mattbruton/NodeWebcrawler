export const createIFrame = (html, parent) => {
  let iframe = document.createElement('iframe');
  iframe.setAttribute('srcdoc', html);
  iframe.setAttribute('class', 'remote__iframe');
  if (document.querySelector('iframe')) {
    parent.removeChild(document.querySelector('iframe'));
  }
  parent.appendChild(iframe);
};