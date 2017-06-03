var s3key = require('./../../config.js').s3key

module.exports = function(router) {

  router.route('/s3')
  /**
  * @api {get} /s3 Get S3key
  * @apiName GetS3key
  * @apiGroup S3key
  * @apiPermission admin
  *
  * @apiSuccess {String} s3key The key for uploading images.
 */
 .get(function(req, res) {

   return res.status(200).json({
     ok: true,
     s3key: s3key
   })

 })
}
