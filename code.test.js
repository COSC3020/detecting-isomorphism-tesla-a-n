const fs = require('fs');
const jsc = require('jsverify');

eval(fs.readFileSync('code.js')+'');

//complete graph test
//cycle graph test
//path graph test
//star graph test
//helper function to duplicate graph (isomorphic copy)
//helper function to generate a random permutation
//function to test each of the isomorphic copies (complete, cycle, path, star) are isomorphic
//function to test that different graphs are not isomorphic
//js.verify for each test
