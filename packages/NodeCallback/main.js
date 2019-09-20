var fs = require("fs");

// Blocking
// var data = fs.readFileSync('input.txt');
// console.log(data.toString());
// console.log("Program Ended");

// Non-blocking
fs.readFile('input.txt', function (err, data) {
    if (err) return console.error(err);
    console.log(data.toString());
 });
console.log("Program Ended");