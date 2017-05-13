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
   * @apiParam {String} [description] The description of the postit.
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
        description: req.body.description,
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

  router.route('/postits/:id')
    /**
     * @api {put} /postits/:id Update Postit
     * @apiName UpdatePostit
     * @apiGroup Postits
     * @apiPermission admin
     *
     * @apiParam {String} name The name of the postit
     * @apiParam {String} [description] The description of the postit.
     * @apiParam {String} [imageUrl] Url to the image of the postit
     *
     * @apiSuccess {Object} postit The updated postit
    */
    .put(function(req, res) {

      Postit.findById(req.params.id, function(err, postit) {

        // not a valid id
        if (err && err.name != 'CastError') res.status(404).json({
          ok: false,
          err: err.message
        })

        else if (!err && postit) {
          if (postitIsValid(req.body)) {

            postit.name = req.body.name
            postit.description = req.body.description
            postit.imageUrl = req.body.imageUrl

            postit.save(function(err) {

              // internal server error
              if (err) res.status(500).json({
                ok: false,
                err: err.message
              })

              // return the updated postit
              else res.status(200).json({
                ok: true,
                postit: postit
              })
            })

            // not a valid postit
          } else res.status(412).json({
            ok: false,
            message: 'Missing fields'
          })

          // no postit with this id
        } else res.status(404).json({
          ok: false,
          message: 'Postit not found'
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
         if (err && err.name != 'CastError') res.status(404).json({
           ok: false,
           err: err.message
         })

         else if (!err && postit) {
           Postit.remove({ _id: req.params.id }, function(err, postit) {

             // internal server error
             if (err) res.status(500).json({
               ok: false,
               err: err.message
             })

             // successfully deleted
             else res.status(200).json({
               ok: true,
               message: 'Successfully deleted'
             })
           })

           // no postit with this id
         } else res.status(404).json({
           ok: false,
           message: 'Postit not found'
         })
       })
     })

}
