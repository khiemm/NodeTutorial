const fs = require("fs");
const csv = require("csv/lib/sync");
const xlsx = require("xlsx");
const ObjectId = require("bson").ObjectId;
const jsonToCsv = require("json-2-csv");
const csvParser = require("csv-parser");
const timeSpan = require("time-span");

/**
 *
 * @param {string} filePath file or folder path
 * @param {string} header header in top
 */
const addHeaderToCsv = (filePath, header) => {
  if (!filePath) {
    return;
  }
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
  console.time("lol");
  const data = fs.readFileSync(filePath);
  const jsonData = csv.parse(data, {
    columns: true,
    skip_empty_lines: true,
  });
  console.log(jsonData.length);
  // fs.writeFileSync(newPath, JSON.stringify(jsonData));
  console.timeEnd("lol");
};

const transformCsvToJsonByStream = async (filePath) => {
  let duration;
  const results = [];
  await new Promise((resolve) => {
    const end = timeSpan();
    const data = fs
      .createReadStream(filePath)
      .pipe(csvParser())
      .on("data", (data) => results.push(data))
      .on("end", () => {
        duration = end().toPrecision(2);
        resolve();
      });
  });
  console.log(results.length);
  console.log(duration);
};

const writeJsonToCsv = async (data) => {
  const csvData = await jsonToCsv.json2csvAsync(data);
  return csvData;
};

const sheetToJson = (filePath) => {
  const workbook = xlsx.readFile(filePath);
  var sheet_name_list = workbook.SheetNames;
  const jsonData = xlsx.utils.sheet_to_json(
    workbook.Sheets[sheet_name_list[0]]
  );
  fs.writeFileSync(
    "/home/khiem/Downloads/cardnumber500.json",
    JSON.stringify(jsonData.map((e) => e.Card_no))
  );
};

const writeByStream = () => {
  let writer = fs.createWriteStream("test_gfg.txt");

  // Read and disply the file data on console
  writer.write("GeeksforGeeks");
};

const pipeWriteStream = () => {
  let writer = fs.createWriteStream("test_gfg.txt", {
    flags: "w",
  });

  // Use fs.createReadStream() method
  // to read the file
  let reader = fs.createReadStream("test_gfg.txt").pipe(writer);
};

const pipeWriteStreamAppend = () => {
  var readableStream = fs.createReadStream("text1.txt");
  var writableStream = fs.createWriteStream("text2.txt", {
    flags: "a",
  });

  readableStream.setEncoding("utf8");
  readableStream.push("ping!");
  readableStream.on("data", function (chunk) {
    writableStream.write(chunk);
  });
};

// addHeaderToCsv(
//   "/home/khiem/Documents/migration/profile_ignore_Daily Gift_Card_Registration_ULP_26-27_March_2021/",
//   '"PROFILE_NO","TITLE","NAME","NAME_DISPLAY","IC_MYKAD","IC_OTHERS","IC_PASSPORT","DATE_BIRTH","GENDER","RACE","NATIONALITY","MARITAL","HAVE_CAR","HAVE_CC","REG_DEALER","DATE_CREATE","DATE_REGISTER","DATE_ACTIVATE","MASTER_ID","CASH_ACC","CASH_AVAILABLE","CASH_LOCK","ADDRESS1","ADDRESS2","ADDRESS3","POSTCODE","CITY","STATE","COUNTRY","M_ADDRESS1","M_ADDRESS2","M_ADDRESS3","M_POSTCODE","M_CITY","M_STATE","M_COUNTRY","BIRTHDATE","EMAIL","CONTACT","MOBILE","DAILYSPENDING","MONTHLYSPENDING","SINGLELIMIT","TOPUPLIMIT","PRODUCTLIMIT","PROMO","DATE_CASH_ACC_RECON","CARD_NO"'
// );
// transformCsvToJson(
//   "/home/khiem/Downloads/test_bulk_transfer/import_bulk_transfer_0123.csv"
// );

// transformCsvToJson("large-dataset.csv");

// transformCsvToJsonByStream("large-dataset.csv");

// writeByStream();

// pipeWriteStream();

// pipeWriteStreamAppend();I
