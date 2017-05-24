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

    if (!typeIsValid(req.body)) {

      // not a valid type Object
      res.status(412).json({
        ok: false,
        message: 'Missing fields'
      })
    } else {

      var type = new Type({
        name: req.body.name
      })

      type.save(function(err) {

        // internal server error
        if (err) res.status(500).json({
          ok: false,
          err: err.message
        })

        // return created type
        else res.status(200).json({
          ok: true,
          type: type
        })
      })
    }

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
      if (err && err.name != 'CastError') res.status(404).json({
        ok: false,
        err: err.message
      })

      else if (!err && type) {
        if (typeIsValid(req.body)) {

          type.name = req.body.name

          type.save(function(err) {

            // internal server error
            if (err) res.status(500).json({
              ok: false,
              err: err
            })

            // return the updated typeUid
            res.status(200).json({
              ok: true,
              type: type
            })
          })

          // not a valid type
        } else res.status(412).json({
          ok: false,
          message: 'Missing fields'
        })

        // no type with this id
      } else res.status(404).json({
        ok: false,
        message: 'Type not found'
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
      if (err && err.name != 'CastError') res.status(404).json({
        ok: false,
        err: err.message
      })

      else if (!err && type) {

        Category
        .find({ typeUid: type._id }, function(err, categories) {

          // internal server error
          if (err) res.status(500).json({
            ok: false,
            err: err.message
          })

          // type is not in use by any categories -> delete
          else if (categories.length == 0) {

            Type.remove({ _id: req.params.id }, function(err, type) {

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

          }

          // type is in use by category -> do not delete
          else res.status(403).json({
            ok: false,
            message: 'Type is in use by at least one category - not deleted'
          })

        })


        // no type with this id
      } else res.status(404).json({
        ok: false,
        message: 'Type not found'
      })
    })
  })

}
