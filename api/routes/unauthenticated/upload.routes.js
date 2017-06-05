var aws = require('aws-sdk')
var multer = require('multer')
var multerS3 = require('multer-s3')

var s3 = new aws.S3({})

var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'lungau',
    metadata: function(req, file, cb) {
      cb(null, {})
    },
    key: function(req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
})

module.exports = function(router) {

  router.route('/upload')

  .post(upload.single('file'), function(req, res) {
    console.log(req.file)

    res.status(200).json({
      ok: true,
      message: 'test'
    })
  })
}
