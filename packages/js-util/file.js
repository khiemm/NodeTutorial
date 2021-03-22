const csv = require("csv/lib/sync");
const xlsx = require("xlsx");
const ObjectId = require("bson").ObjectId;
const jsonToCsv = require("json-2-csv");

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
    var buffer = new Buffer.from(`${header}\n`);
    fs.writeSync(fd, buffer, 0, buffer.length, 0); //write new data
    fs.writeSync(fd, data, 0, data.length, buffer.length); //append old data
    // or fs.appendFile(fd, data);
    fs.close(fd, (err) => {
      if (err) throw err;
    });
  });
};

const transformCsvToJson = (
  filePath,
  newPath = filePath.slice(0, -3) + "json"
) => {
  const fs = require("fs");
  const data = fs.readFileSync(filePath);
  const jsonData = csv.parse(data, {
    columns: true,
    skip_empty_lines: true,
  });
  fs.writeFileSync(newPath, JSON.stringify(jsonData));
};

const writeJsonToCsv = (data) => {
  const csvData = await jsonToCsv.json2csvAsync(data)
  return csvData
};

// addHeaderToCsv(
//   "/home/khiem/Documents/product_sales_posted/",
//   '"STAN","CARD","PROFILE","DEALER_CODE","MID","TID","RRN","AIR","TX_TYPE","CUR_TYPE","AMT_TX","DATE_TX","DATE_IMPORT","SETTLERRN","SETTLECLOSERRN","DATE_SETTLE","DATE_POST","PRODUCT_CODE","PRODUCT","PQTY","PPRC","PAMT","BATCH_NO","STATUS","DATE_UPDATE","POST_ID","GST_DATA","GST_INV","GST_TOTAL","GST_CODE","GST_AMT"'
// );
// transformCsvToJson(
//   "/home/khiem/Downloads/test_bulk_transfer/import_bulk_transfer_0123.csv"
// );

const sheetToJson = (filePath) => {
  const workbook = xlsx.readFile(filePath);
  var sheet_name_list = workbook.SheetNames;
  const jsonData = xlsx.utils.sheet_to_json(
    workbook.Sheets[sheet_name_list[0]]
  );
  const fs = require("fs");
  fs.writeFileSync(
    "/home/khiem/Downloads/cardnumber500.json",
    JSON.stringify(jsonData.map((e) => e.Card_no))
  );
};
