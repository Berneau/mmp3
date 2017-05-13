var Postit = require('../../models/postit.model')

module.exports = function(router) {

  router.route('/postits')
  /**
   * @api {get} /postits Get all postits
   * @apiName GetPostits
   * @apiGroup Postits
   * @apiPermission none
   *
   * @apiSuccess {Array} postit Array of postits
  */
  .get(function(req, res) {

    Postit
    .find({}, function(err, postits) {

      // internal server error
      if (err) res.status(500).json({
        ok: false,
        err: err.message
      })

      // return postit list
      else res.status(200).json({
        ok: true,
        postits: postits
      })
    })
    .sort({name: 1})
  })

  router.route('/postits/:id')
  /**
   * @api {get} /postits/:id Get postit
   * @apiName GetPostit
   * @apiGroup Postits
   * @apiPermission none
   *
   * @apiSuccess {Object} postit The postit for given id.
  */
  .get(function(req, res) {
    Postit.findById(req.params.id, function(err, postit) {

      // internal server err
      if (err && err.name != 'CastError') res.status(404).json({
        ok: false,
        err: err.message
      })

      // return found postit object
      else if (!err && postit) res.status(200).json({
        ok: true,
        postit: postit
      })

      // no postit was found
      else res.status(404).json({
        ok: false,
        message: 'Postit not found'
      })
    })
  })
}
