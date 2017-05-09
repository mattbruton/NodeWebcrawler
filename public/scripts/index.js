console.log('hi!');

const fetchPage = () => {
    return new Promise((resolve, reject) => {
        fetch('./page')
            .then(response => response.text())
            .then(data => {
                resolve(data);
            });
    });
};

document.getElementById('btn').addEventListener('click', () => {
    fetchPage()
    .then(response => {
        var iframe = document.createElement('iframe');
        iframe.setAttribute('srcdoc', response);
        iframe.setAttribute('height', '400px')
        iframe.setAttribute('width', '800px');
        document.getElementById('container__results').appendChild(iframe);
    });
})