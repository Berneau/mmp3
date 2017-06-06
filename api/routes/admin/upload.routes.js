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
    console.log(err)
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

    // req.file is empty
    if (!req.file) return res.status(500).json({
      ok: false,
      message: 'Image not saved'
    })

    // return image originalname
    return res.status(200).send(req.file.location)
  })
}
