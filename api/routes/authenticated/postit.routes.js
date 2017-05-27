var Postit = require('../../models/postit.model')
var postitIsValid = require('../../helpers/helpers').postitIsValid
var postitFactory = require('../../helpers/helpers').postitFactory

module.exports = function(router) {

  router.route('/postits')
  /**
   * @api {post} /postits Create Postit
   * @apiName CreatePostit
   * @apiGroup Postits
   * @apiPermission admin
   *
   * @apiParam {String} name The name of the postit
   * @apiParam {Boolean} confirmed Shows if the post is reviewed or not.
   * @apiParam {String} [description] The description of the postit.
   * @apiParam {String} [location] The location of the event.
   * @apiParam {String} [vendorId] The id to the referred vendor.
   * @apiParam {String} [imageUrl] Url to the image of the postit
   *
   * @apiSuccess {Object} postit The created postit
 */
  .post(function(req, res) {

    // not a valid postit Object
    if (!postitIsValid(req.body)) return res.status(412).json({
      ok: false,
      message: 'Missing fields'
    })

    var postit = new Postit()
    postit = postitFactory(req.body, postit)

    postit.save(function(err) {

      //internal server error
      if (err) return res.status(500).json({
        ok: false,
        err: err.message
      })

      // return created postit
      res.status(200).json({
        ok: true,
        postit: postit
      })
    })

  })

}
