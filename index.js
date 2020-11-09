const fs = require('fs');

const txt = fs.readFileSync('./txt/input.txt', 'utf-8');

const textOut = `hello \n ${txt} date: ${Date.now()}`;

fs.writeFileSync('./txt/final.txt', textOut);

console.log('File written')