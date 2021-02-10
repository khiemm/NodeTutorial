/**
 * 
 * @param {string} filePath file or folder path
 * @param {string} header header in top
 */
const addHeaderToCsv = (filePath, header) => {
    if (!filePath) {
        return
    }
    const fs = require("fs");
    fs.readdirSync(filePath).forEach((file) => {
        console.log("file", file);
        var data = fs.readFileSync(filePath + file); //read existing contents into data
        var fd = fs.openSync(filePath + file, "w+");
        // FIXME:
        var buffer = new Buffer(`${header}\n'`);
        fs.writeSync(fd, buffer, 0, buffer.length, 0); //write new data
        fs.writeSync(fd, data, 0, data.length, buffer.length); //append old data
        // or fs.appendFile(fd, data);
        fs.close(fd, (err) => {
            if (err) throw err;
        });
    });
}

addHeaderToCsv()
