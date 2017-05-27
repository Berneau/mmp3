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

    Postit.find({}, function(err, postits) {

      // internal server error
      if (err) return res.status(500).json({
        ok: false,
        err: err.message
      })

      // return postit list
      res.status(200).json({
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
      if (err && err.name != 'CastError') return res.status(404).json({
        ok: false,
        err: err.message
      })

      // no postit was found
      if (!postit) return res.status(404).json({
        ok: false,
        message: 'Postit not found'
      })

      // return found postit object
      res.status(200).json({
        ok: true,
        postit: postit
      })

    })
  })
}
