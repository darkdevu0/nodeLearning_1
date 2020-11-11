const fs = require('fs');
const http = require('http');
const url = require('url');

let jsonData, dataObj;

jsonData = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
dataObj = JSON.parse(jsonData);

const server = http.createServer((req, res) => {
    console.log(req.url);

    const pathName = req.url;

    if (pathName === '/overview') {
        res.end('Hello from server overview');
    } else if (pathName === '/product') {
        res.end('Is product');
    } else if (pathName === '/api') {
        res.writeHead(200, {
            'Content-type': 'application/json'
        })
        res.end(jsonData);
    } else {
        res.writeHead(404, {
            'Content-type': 'text/html'
        });
        res.end('<h1>home</h1>');
    }

});

server.listen(3000, () => {
    console.log('started');
});


                                          