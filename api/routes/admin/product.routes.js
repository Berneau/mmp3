var Product = require('../../models/product.model')

module.exports = function(router) {

  router.route('/products')
  /**
   * @api {post} /products Create Product
   * @apiName CreateProduct
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
   * @apiSuccess {Object} product The created product.
 */
  .post(function(req, res) {

    if (!productIsValid(req.body)) {
      res.status(412).json({ message: 'Missing fields' })
    } else {

      var product = new Product({
        name: req.body.name,
        categoryId: req.body.categoryId,
        vendorId: req.body.vendorId,
        availableAt: {
          fromPeriod: req.body.fromPeriod,
          fromMonth: req.body.fromMonth,
          toPeriod: req.body.toPeriod,
          toMonth: req.body.toMonth
        },
        imageUrl: req.body.imageUrl
      })

      product.save(function(err) {
        if (err) res.status(500).end(err)
        res.status(200).json(product)
      })
    }

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
        if (err && err.name != 'CastError') res.status(404).json(err.message)

        else if (!err && product) {
          if (productIsValid(req.body)) {

            product.name = req.body.name,
            product.categoryId = req.body.categoryId,
            product.vendorId = req.body.vendorId,
            product.availableAt.fromPeriod = req.body.fromPeriod,
            product.availableAt.fromMonth = req.body.fromMonth,
            product.availableAt.toPeriod = req.body.toPeriod,
            product.availableAt.toMonth = req.body.toMonth,
            product.imageUrl = req.body.imageUrl

            product.save(function(err) {
              if (err) res.status(500).end(err)
              res.status(200).json(product)
            })

          } else res.status(412).json({ message: 'Missing fields' })

        } else res.status(404).json({ message: 'Product not found'})
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
        if (err && err.name != 'CastError') res.status(404).json(err.message)

        else if (!err && product) {
          Product.remove({ _id: req.params.id }, function(err, product) {
            if (err) res.status(500).end(err)
            res.status(200).json({ message: 'Successfully deleted' })
          })
        } else res.status(404).json({ message: 'Product not found'})

      })
    })


    function productIsValid(product) {
      if (!product.name ||
          !product.categoryId ||
          !product.vendorId ||
          !product.fromPeriod ||
          !product.fromMonth ||
          !product.toPeriod ||
          !product.toMonth) return false
      else return true
    }
}
