var express = require('express');
var app = express();
var fs = require("fs");
var cookieParser = require('cookie-parser')

var bodyParser = require('body-parser');
var multer = require('multer');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

// phải là string để đọc đc file, tên gì cũng đc
app.use(multer({ dest: 'lol' }).any());
app.use(cookieParser())

app.get('/', function (req, res) {
   console.log("Cookies: ", req.cookies)
   res.send('Hello World');
})

app.get('/index.htm', function (req, res) {
   res.sendFile(__dirname + "/" + "index.htm");
})

app.post('/file_upload', function (req, res) {
   var fileReiceved = req.files[0]
   console.log(fileReiceved)
   console.log(fileReiceved.originalname);
   console.log(fileReiceved.path);
   console.log(fileReiceved.mimetype);
   // đường dẫn thư mục chứa file
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
         }

         console.log(response);
         res.end(JSON.stringify(response));
      });
   });
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})