const fs = require('fs');
const http = require('http');
const url = require('url');

const replaceTemplate = (temp, product) => {
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id);
    if(!product.organic) {
        output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
    }
    return output;
}

const jsonData = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const productTemp = fs.readFileSync(`${__dirname}/templates/product.html`, 'utf-8');
const cardTemp = fs.readFileSync(`${__dirname}/templates/card.html`, 'utf-8');
const overviewTemp = fs.readFileSync(`${__dirname}/templates/overview.html`, 'utf-8');
const dataObj = JSON.parse(jsonData);

const server = http.createServer((req, res) => {
    console.log(req.url);

    const pathName = req.url;

    if (pathName === '/overview') {

        res.writeHead(200, {'Content-type': 'text/html'});

        const cardsHtml = dataObj.map((el) => replaceTemplate(cardTemp, el));
        const output = overviewTemp.replace(/{%PRODUCT_CARDS%}/g, cardsHtml);

        res.end(output);


    } else if (pathName === '/product') {
        res.end('is product');


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


                                          