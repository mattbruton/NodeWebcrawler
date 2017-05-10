export const createIFrame = (html, parent) => {
  parent.innerHTML = "";
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

export const CreateResultsTable = (parent) => {
    let table = document.createElement('table');
    let tableHeader = document.createElement('tr');
    let tableDataDomain = document.createElement('td');
    let tableDataCount = document.createElement('td');
    table.setAttribute('class', 'resultsTable');
    table.appendChild(tableHeader);
    tableHeader.appendChild(tableDataDomain);
    tableHeader.appendChild(tableDataCount);
    tableDataCount.innerText = "Total Remote URLs";
    tableDataDomain.innerText = "URL";
    parent.appendChild(table);
};

export const CreateTableRows = (results, parent) => {
  let rowIdCounter = 0;
  results.map(result => {
    let row = document.createElement('tr');
    parent.appendChild(row);
    let url = document.createElement('td');
    let count = document.createElement('td');
    url.setAttribute('id', `url${rowIdCounter}`);
    count.setAttribute('id', `result${rowIdCounter}`);
    let urlData = result.url;
    let countData = result.totalRemoteUrls;
    row.appendChild(url);
    row.appendChild(count);
    url.innerText = urlData;
    count.innerHTML = countData;
    
    rowIdCounter++;
  });
};