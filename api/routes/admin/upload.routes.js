var aws = require('aws-sdk')
var multer = require('multer')
var multerS3 = require('multer-s3')

aws.config.loadFromPath('./s3Config.json')
var s3 = new aws.S3({})

// TODO: check image filetype

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
  /**
  * @api {post} /upload Upload image
  * @apiName PostImage
  * @apiGroup Images
  * @apiPermission admin
  *
  * @apiSuccess {String} originalname Location of the image saved to s3.
  */
  .post(upload.single('file'), function(req, res) {

    res.status(200).json({
      ok: true,
      originalname: req.file.originalname
    })

  })
}