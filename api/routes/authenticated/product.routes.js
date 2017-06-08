var Product = require('../../models/product.model')
var productIsValid = require('../../helpers/helpers').productIsValid
var productFactory = require('../../helpers/helpers').productFactory
var deleteImage = require('../../helpers/helpers').deleteImage


module.exports = function(router) {

  router.route('/products')
  /**
   * @api {post} /products Create Product
   * @apiName CreateProduct
   * @apiGroup Products
   * @apiPermission authenticated
   *
   * @apiParam {String} name The name of the product.
   * @apiParam {String} categoryId The id of the category.
   * @apiParam {Object} vendor The vendor object.
   * @apiParam {Object} availableAt AvailableAt-Wrapper
   * @apiParam {String} availableAt.fromPeriod e.g. Anfang
   * @apiParam {String} availableAt.fromMonth e.g. Mai
   * @apiParam {String} availableAt.toPeriod e.g. Ende
   * @apiParam {String} availableAt.toMonth e.g. September
   * @apiParam {String} [imageUrl] The url to the image.
   *
   * @apiSuccess {Object} product The created product.
  */
  .post(function(req, res) {

    // not a valid product
    if (!productIsValid(req.body)) return res.status(412).json({
      ok: false,
      message: 'Missing fields'
    })

    var product = new Product()
    product = productFactory(req.body, product)

    product.save(function(err) {

      // internal server error
      if (err) return res.status(500).json({
        ok: false,
        err: err.message
      })

      // return the created product
      res.status(200).json({
        ok: true,
        product: product
      })

    })

  })

  router.route('/products/:id')
  /**
   * @api {put} /products/:id Update product
   * @apiName UpdateProduct
   * @apiGroup Products
   * @apiPermission admin
   *
   * @apiParam {String} name The name of the product.
   * @apiParam {String} categoryId The id of the category.
   * @apiParam {Object} vendor The vendor object.
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
      if (err && err.name != 'CastError') return res.status(404).json({
        ok: false,
        err: err.message
      })

      // no product with this id
      if (!product) return res.status(404).json({
        ok: false,
        message: 'Product not found'
      })

      // not a valid product
      if (!productIsValid(req.body)) return res.status(412).json({
        ok: false,
        message: 'Missing fields'
      })

      // image has been changed
      var params
      if (req.body.imageKey != product.imageKey) {
        params = {
          Bucket: 'lungau',
          Key: product.imageKey
        }
      }

      product = productFactory(req.body, product)

      product.save(function(err) {

        // internal server error
        if (err) return res.status(500).json({
          ok: false,
          err: err.message
        })

        // old image has to be deleted
        if (params) {

          deleteImage(params, function(err) {

            // error deleting image
            if (err) return res.status(200).json({
              ok: true,
              message: 'Updated product, but error deleting old image'
            })

            // return the updated product
            res.status(200).json({
              ok: true,
              product: product
            })

          })

        // return the updated product
        } else res.status(200).json({
          ok: true,
          product: product
        })

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
      if (err && err.name != 'CastError') return res.status(404).json({
        ok: false,
        err: err.message
      })

      // no product with this id found
      if (!product) return res.status(404).json({
        ok: false,
        message: 'Product not found'
      })

      // set imageKey before product is deleted
      var params = {
        Bucket: 'lungau',
        Key: product.imageKey
      }

      Product.remove({ _id: req.params.id }, function(err, product) {

        // internal server error
        if (err) return res.status(500).json({
          ok: false,
          err: err.message
        })

        if (!params.Key) return res.status(200).json({
          ok: true,
          message: 'Removed product, no image found tho'
        })

        deleteImage(params, function(err) {

          // error deleting image
          if (err) return res.status(200).json({
            ok: true,
            message: 'Removed product, but error deleting image'
          })

          // successfully deleted
          res.status(200).json({
            ok: true,
            message: 'Successfully deleted product and image'
          })

        })

      })

    })

  })

}
