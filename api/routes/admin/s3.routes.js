var s3Credentials = require('./../../config.js').s3Credentials

module.exports = function(router) {

  router.route('/s3')
  /**
  * @api {get} /s3 Get s3Credentials
  * @apiName Gets3Credentials
  * @apiGroup s3Credentials
  * @apiPermission admin
  *
  * @apiSuccess {Object} s3Credentials The credentials for uploading images.
 */
 .get(function(req, res) {

   return res.status(200).json({
     ok: true,
     s3Credentials: s3Credentials
   })

 })
}
