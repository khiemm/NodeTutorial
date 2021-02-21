/**
 *
 * @param {string} filePath file or folder path
 * @param {string} header header in top
 */
const addHeaderToCsv = (filePath, header) => {
  if (!filePath) {
    return;
  }
  const fs = require("fs");
  // FIXME: try readdir, check performance
  fs.readdirSync(filePath).forEach((fileName) => {
    console.log("file:", fileName);
    var data = fs.readFileSync(filePath + fileName); //read existing contents into data
    var fd = fs.openSync(filePath + fileName, "w+");
    // FIXME: try remove Buffer.from, as use string, check performance
    var buffer = new Buffer.from(`${header}\n'`);
    fs.writeSync(fd, buffer, 0, buffer.length, 0); //write new data
    fs.writeSync(fd, data, 0, data.length, buffer.length); //append old data
    // or fs.appendFile(fd, data);
    fs.close(fd, (err) => {
      if (err) throw err;
    });
  });
};

addHeaderToCsv();
