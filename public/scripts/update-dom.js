export const createIFrame = (html, parent) => {
  parent.innerHTML = "";
  let iframe = document.createElement('iframe');
  iframe.setAttribute('srcdoc', html);
  iframe.setAttribute('class', 'remote__iframe');
  if (document.querySelector('iframe')) {
    parent.removeChild(document.querySelector('iframe'));
  };
  parent.appendChild(iframe);
};

export const CreateResultsNotification = (results, domain, parent) => {
  let h3 = document.createElement('h3');
  h3.innerHTML = `Found ${results.length} remote urls on ${domain}!`;
  if (parent.querySelector('h3')) {
    parent.removeChild(document.querySelector('h3'));
  };
  parent.appendChild(h3);
};

export const CreateResultsTable = (parent => {
  let table = document.createElement('table');
  table.setAttribute('class', 'resultsTable');
  table.innerHTML = `
  <tr>
    <td>URL</td>
    <td>Total Remote URLs</td>
  <tr>
  `;
  parent.appendChild(table);
});

export const CreateDecendingTableRows = (results, parent) => {
  results.sort((a, b) => b.totalRemoteUrls - a.totalRemoteUrls)
    .map(result => {
      let row = document.createElement('tr');
      parent.appendChild(row);
      row.innerHTML = `
    <td class="url_cell">${result.url}</td>
    <td class="count_cell">${result.totalRemoteUrls}</td>
    `;
      parent.appendChild(row);
    });
};