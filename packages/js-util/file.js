const fs = require("fs");
const csv = require("csv/lib/sync");
const xlsx = require("xlsx");
const ObjectId = require("bson").ObjectId;
const jsonToCsv = require("json-2-csv");
const csvParser = require("csv-parser");
const timeSpan = require("time-span");
const _ = require('lodash');

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
  fs.writeFileSync(newPath, JSON.stringify(jsonData));
  console.timeEnd("lol");
};
// transformCsvToJson('/home/khiem/Documents/import\ transactions/260_transactions_of_166_open_batches_were_exported_from_GMS.csv', '/home/khiem/Documents/import\ transactions/123.json')

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

// transformCsvToJsonByStream("large-dataset.csv");

// writeByStream();

// pipeWriteStream();

// pipeWriteStreamAppend();I

const groupTransactionToSettlement = async (
  filePath,
  newPath = filePath.slice(0, -3) + "csv"
) => {
  console.time("lol");
  const data = fs.readFileSync(filePath);
  const jsonData = csv.parse(data, {
    columns: true,
    skip_empty_lines: true,
  });
  console.log(jsonData.length);
  const arr = {}
  const result = jsonData.reduce((acc, val) => {
    const key = val.MID + val.TID + val.BATCH_NO
    if (!arr[key]) {
      arr[key] = Object.assign({}, {
        STAN: val.STAN,
        MTI: '',
        NII: '',
        TID: val.TID,
        MID: val.MID,
        BATCH_NO: val.BATCH_NO,
        PURCHASE_AMT: val.TX_TYPE === 'TOPUP' ? 0 : +val.AMT_TX,
        PURCHASE_COUNT: val.TX_TYPE === 'TOPUP' ? 0 : 1,
        TOPUP_AMT: val.TX_TYPE === 'TOPUP' ? +val.AMT_TX : 0,
        TOPUP_COUNT: val.TX_TYPE === 'TOPUP' ? 1 : 0,
      })
      acc.push(arr[key])
    } else {
      // ref, so arr[key] change => result[e=arr[key]] change
      if (val.TX_TYPE === 'TOPUP') {
        arr[key].TOPUP_AMT += +val.AMT_TX
        arr[key].TOPUP_COUNT += 1
      } else {
        arr[key].PURCHASE_AMT += +val.AMT_TX
        arr[key].PURCHASE_COUNT += 1
      }
    }
    return acc
  }, [])
  console.log(result.length)
  const csvData = await jsonToCsv.json2csvAsync(result);
  fs.writeFileSync(newPath, csvData);
  console.timeEnd("lol");
};
groupTransactionToSettlement('/home/khiem/Documents/import\ transactions/260_transactions_of_166_open_batches_were_exported_from_GMS.csv', '/home/khiem/Documents/import\ transactions/1234567.csv')
