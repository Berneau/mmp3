var Product = require('../../models/product.model')
var productIsValid = require('../../helpers/helpers').productIsValid

module.exports = function(router) {

  router.route('/products/:id')
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
      if (err && err.name != 'CastError') return res.status(404).json({
        ok: false,
        err: err.message
      })

      // no product with this id found
      if (!product) return res.status(404).json({
        ok: false,
        message: 'Product not found'
      })

      Product.remove({ _id: req.params.id }, function(err, product) {

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
