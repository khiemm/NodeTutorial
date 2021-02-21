var fs = require("fs");
var data = "";

// Create a readable stream
var readerStream = fs.createReadStream("input.txt");

// Set the encoding to be utf8.
readerStream.setEncoding("UTF8");

// Handle stream events --> data, end, and error
readerStream.on("data", function (chunk) {
  data += chunk;
  console.log("listen data", data, chunk);
});

readerStream.on("end", function () {
  console.log("listen end", data);
});

readerStream.on("error", function (err) {
  console.log(err.stack);
});

console.log("Program Ended");

// https://nodejs.org/api/fs.html#fs_fs_createreadstream_path_options
// https://nodejs.org/api/stream.html#stream_class_stream_readable
