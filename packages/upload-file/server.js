var express = require('express');
var app = express();
var fs = require("fs");
var cookieParser = require('cookie-parser')

var bodyParser = require('body-parser');
var multer = require('multer');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(multer({ dest: 'public/images' }).any());
app.use(cookieParser())

app.get('/', function (req, res) {
   res.send('Hello World');
})

app.get('/index.htm', function (req, res) {
   res.sendFile(__dirname + "/" + "index.htm");
})

app.post('/file_upload', function (req, res) {
   // read binary file data
   var fileReiceved = req.files[0]
   console.log(fileReiceved)

   // create new file path and save binary data
   var file = __dirname + "/public/images/" + fileReiceved.originalname;

   fs.readFile(fileReiceved.path + '', function (err, data) {
      fs.writeFile(file, data, function (err) {
         if (err) {
            console.log(err);
         } else {
            response = {
               message: 'File uploaded successfully',
               filename: fileReiceved.originalname
            };
            // delete binary file data
            fs.unlink(fileReiceved.path + '', (err) => {
            })
         }

         res.end(JSON.stringify(response));
      });
   });
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})