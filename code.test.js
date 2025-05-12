const fs = require('fs');
const jsc = require('jsverify');

eval(fs.readFileSync('code.js')+'');
