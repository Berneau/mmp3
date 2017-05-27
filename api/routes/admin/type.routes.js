var Type = require('../../models/type.model')
var Category = require('../../models/category.model')
var typeIsValid = require('../../helpers/helpers').typeIsValid

module.exports = function(router) {

  router.route('/types')
  /**
   * @api {post} /types Create Type
   * @apiName CreateType
   * @apiGroup Types
   * @apiPermission admin
   *
   * @apiParam {String} name The name of the type
   *
   * @apiSuccess {Object} type The created type
 */
  .post(function(req, res) {

    // not a valid type Object
    if (!typeIsValid(req.body)) return res.status(412).json({
      ok: false,
      message: 'Missing fields'
    })

    var type = new Type({
      name: req.body.name
    })

    type.save(function(err) {

      // internal server error
      if (err) return res.status(500).json({
        ok: false,
        err: err.message
      })

      // return created type
      res.status(200).json({
        ok: true,
        type: type
      })

    })

  })

  router.route('/types/:id')
  /**
   * @api {put} /types/:id Update Type
   * @apiName UpdateType
   * @apiGroup Types
   * @apiPermission admin
   *
   * @apiParam {String} name The name of the type
   *
   * @apiSuccess {Object} type The updated type
  */
  .put(function(req, res) {

    Type.findById(req.params.id, function(err, type) {

      // not a valid id
      if (err && err.name != 'CastError') return res.status(404).json({
        ok: false,
        err: err.message
      })

      // no type with this id
      if (!type) return res.status(404).json({
        ok: false,
        message: 'Type not found'
      })

      // not a valid type
      if (!typeIsValid(req.body)) return res.status(412).json({
        ok: false,
        message: 'Missing fields'
      })

      type.name = req.body.name

      type.save(function(err) {

        // internal server error
        if (err) return res.status(500).json({
          ok: false,
          err: err
        })

        // return the updated typeUid
        res.status(200).json({
          ok: true,
          type: type
        })

      })

    })

  })

  /**
   * @api {delete} /types/:id Delete type
   * @apiName DeleteType
   * @apiGroup Types
   * @apiPermission admin
   *
   * @apiSuccess {String} message Success message.
  */
  .delete(function(req, res) {

    Type.findById(req.params.id, function(err, type) {

      // not a valid id
      if (err && err.name != 'CastError') return res.status(404).json({
        ok: false,
        err: err.message
      })

      // no type with this id
      if (!type) return res.status(404).json({
        ok: false,
        message: 'Type not found'
      })

      // search for categories which could use the type
      Category.find({ typeUid: type._id }, function(err, categories) {

        // internal server error
        if (err) return res.status(500).json({
          ok: false,
          err: err.message
        })

        // type is in use by category -> do not delete
        if (categories.length > 0) return res.status(403).json({
          ok: false,
          message: 'Type is in use by at least one category - not deleted'
        })

        // type is not in use by any categories -> delete
        Type.remove({ _id: req.params.id }, function(err, type) {

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

  })

}
