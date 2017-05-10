var Product = require('../../models/product.model')
var productIsValid = require('../../helpers/helpers').productIsValid

module.exports = function(router) {

  router.route('/products/:id')
    /**
     * @api {put} /products/:id Update product
     * @apiName UpdateProduct
     * @apiGroup Products
     * @apiPermission admin
     *
     * @apiParam {String} name The name of the product.
     * @apiParam {String} categoryId The id of the category.
     * @apiParam {String} vendorId The id of the vendor.
     * @apiParam {Object} availableAt AvailableAt-Wrapper
     * @apiParam {String} availableAt.fromPeriod e.g. Anfang
     * @apiParam {String} availableAt.fromMonth e.g. Mai
     * @apiParam {String} availableAt.toPeriod e.g. Ende
     * @apiParam {String} availableAt.toMonth e.g. September
     * @apiParam {String} [imageUrl] The url to the image.
     *
     * @apiSuccess {Object} product The updated product.
    */
    .put(function(req, res) {

      Product.findById(req.params.id, function(err, product) {

        // not a valid id
        if (err && err.name != 'CastError') res.status(404).json({
          ok: false,
          err: err.message
        })

        else if (!err && product) {
          if (productIsValid(req.body)) {

            product.name = req.body.name,
            product.categoryId = req.body.categoryId,
            product.vendorId = req.body.vendorId,
            product.availableAt.fromPeriod = req.body.availableAt ? req.body.availableAt.fromPeriod : undefined,
            product.availableAt.fromMonth = req.body.availableAt ? req.body.availableAt.fromMonth : undefined,
            product.availableAt.toPeriod = req.body.availableAt ? req.body.availableAt.toPeriod : undefined,
            product.availableAt.toMonth = req.body.availableAt ? req.body.availableAt.toMonth : undefined,
            product.imageUrl = req.body.imageUrl

            product.save(function(err) {

              // internal server error
              if (err) res.status(500).json({
                ok: false,
                err: err.message
              })

              // return the updated product
              else res.status(200).json({
                ok: true,
                product: product
              })
            })

            // not a valid product
          } else res.status(412).json({
            ok: false,
            message: 'Missing fields'
          })

          // product with this id is not available
        } else res.status(404).json({
          ok: false,
          message: 'Product not found'
        })
      })
    })


    /**
     * @api {delete} /products/:id Delete product
     * @apiName DeleteProduct
     * @apiGroup Products
     * @apiPermission admin
     *
     * @apiSuccess {String} message Success message.
    */
    .delete(function(req, res) {

      Product.findById(req.params.id, function(err, product) {

        // not a valid id
        if (err && err.name != 'CastError') res.status(404).json({
          ok: false,
          err: err.message
        })

        else if (!err && product) {
          Product.remove({ _id: req.params.id }, function(err, product) {

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

          // no product with this id found
        } else res.status(404).json({
          ok: false,
          message: 'Product not found'
        })

      })
    })

}
