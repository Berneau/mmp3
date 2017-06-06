var aws = require('aws-sdk')
var multer = require('multer')
var multerS3 = require('multer-s3')

aws.config.loadFromPath('./s3Config.json')
var s3 = new aws.S3({})

// middleware to upload to s3
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
  }),
  onError: function(err, next) {

    // error saving image to s3
    res.status(500).json({
      ok: false,
      err: err.message
    })

    next(err)

  }
})

module.exports = function(router) {

  router.route('/upload')
  /**
  * @api {post} /upload Upload image
  * @apiName PostImage
  * @apiGroup Images
  * @apiPermission admin
  *
  * @apiSuccess {String} link Full link to the image saved to s3.
  */
  .post(upload.single('file'), function(req, res) {

    // return image originalname
    res.status(200).json({
      ok: true,
      link: 'https://s3.amazonaws.com/lungau/' + req.file.originalname
    })

  })
}
