var fs = require("fs");

// Blocking
const blocking = () => {
    var data = fs.readFileSync('input.txt');
    console.log(data.toString());
    console.log("Program Ended");
}

// Non-blocking
const nonBlocking = () => {
    fs.readFile('input.txt', function (err, data) {
        if (err) return console.error(err);
        console.log(data.toString());
    });
    console.log("Program Ended");
}

blocking()
nonBlocking()