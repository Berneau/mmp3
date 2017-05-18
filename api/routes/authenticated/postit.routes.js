var Postit = require('../../models/postit.model')
var postitIsValid = require('../../helpers/helpers').postitIsValid

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
   * @apiParam {String} [vendorId] The id to the referred vendor.
   * @apiParam {String} [imageUrl] Url to the image of the postit
   *
   * @apiSuccess {Object} postit The created postit
 */
  .post(function(req, res) {

    if (!postitIsValid(req.body)) {

      // not a valid postit Object
      res.status(412).json({
        ok: false,
        message: 'Missing fields'
      })
    } else {

      var postit = new Postit({
        name: req.body.name,
        confirmed: req.body.confirmed,
        description: req.body.description,
        vendorId: req.body.vendorId,
        imageUrl: req.body.imageUrl
      })

      postit.save(function(err) {

        //internal server error
        if (err) res.status(500).json({
          ok: false,
          err: err.message
        })

        // return created postit
        else res.status(200).json({
          ok: true,
          postit: postit
        })
      })
    }

  })

}
