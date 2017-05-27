var Postit = require('../../models/postit.model')
var postitIsValid = require('../../helpers/helpers').postitIsValid

module.exports = function(router) {

  router.route('/postits/:id')
  /**
   * @api {put} /postits/:id Update Postit
   * @apiName UpdatePostit
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
   * @apiSuccess {Object} postit The updated postit
  */
  .put(function(req, res) {

    Postit.findById(req.params.id, function(err, postit) {

      // not a valid id
      if (err && err.name != 'CastError') return res.status(404).json({
        ok: false,
        err: err.message
      })

      // no postit with this id
      if (!postit) return res.status(404).json({
        ok: false,
        message: 'Postit not found'
      })

      // not a valid postit
      if(!postitIsValid(req.body)) return res.status(412).json({
        ok: false,
        message: 'Missing fields'
      })

      postit.name = req.body.name
      postit.confirmed = req.body.confirmed
      postit.description = req.body.description
      postit.location = req.body.location
      postit.vendorId = req.body.vendorId
      postit.imageUrl = req.body.imageUrl

      postit.save(function(err) {

        // internal server error
        if (err) return res.status(500).json({
          ok: false,
          err: err.message
        })

        // return the updated postit
        res.status(200).json({
          ok: true,
          postit: postit
        })

      })

    })

  })

  /**
   * @api {delete} /postits/:id Delete postit
   * @apiName DeletePostit
   * @apiGroup Postits
   * @apiPermission admin
   *
   * @apiSuccess {String} message Success message.
  */
  .delete(function(req, res) {

    Postit.findById(req.params.id, function(err, postit) {

      // not a valid id
      if (err && err.name != 'CastError') return res.status(404).json({
        ok: false,
        err: err.message
      })

      // no postit with this id
      if (!postit) return res.status(404).json({
        ok: false,
        message: 'Postit not found'
      })

      Postit.remove({ _id: req.params.id }, function(err, postit) {

        // internal server error
        if (err) return res.status(500).json({
          ok: false,
          err: err.message
        })

        // successfully deleted
        res.status(200).json({
          ok: true,
          message: 'Successfully deleted'
        })

      })

    })

  })

}
