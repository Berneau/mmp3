var aws = require('aws-sdk')
var cors = require('cors')
var express = require('express')
var multer = require('multer')
var multerS3 = require('multer-s3')

var app = express()
app.use(cors())

var s3 = new aws.S3({})
var port = 3000

var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'lungau',
    metadata: function(req, file, cb) {
      cb(null, {fieldName: file.fieldName})
    },
    key: function(req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
})

app.post('/upload', upload.single('test'), function(req, res, next) {
  console.log(res.file)
  res.send('finished')
})

app.listen(port)
console.log(' ---------------------------------------')
console.log(' | Lungau API is running on port ' + port + '  |')
console.log(' ---------------------------------------')
