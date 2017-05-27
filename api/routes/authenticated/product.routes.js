var Product = require('../../models/product.model')
var productIsValid = require('../../helpers/helpers').productIsValid


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

    var product = new Product({
      name: req.body.name,
      categoryId: req.body.categoryId,
      vendor: req.body.vendor,
      availableAt: {
        fromPeriod: req.body.availableAt ? req.body.availableAt.fromPeriod : undefined,
        fromMonth: req.body.availableAt ? req.body.availableAt.fromMonth : undefined,
        toPeriod: req.body.availableAt ? req.body.availableAt.toPeriod : undefined,
        toMonth: req.body.availableAt ? req.body.availableAt.toMonth : undefined
      },
      imageUrl: req.body.imageUrl
    })

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

      product.name = req.body.name
      product.categoryId = req.body.categoryId
      product.vendor = req.body.vendor
      product.availableAt.fromPeriod = req.body.availableAt ? req.body.availableAt.fromPeriod : undefined
      product.availableAt.fromMonth = req.body.availableAt ? req.body.availableAt.fromMonth : undefined
      product.availableAt.toPeriod = req.body.availableAt ? req.body.availableAt.toPeriod : undefined
      product.availableAt.toMonth = req.body.availableAt ? req.body.availableAt.toMonth : undefined
      product.imageUrl = req.body.imageUrl

      product.save(function(err) {

        // internal server error
        if (err) return res.status(500).json({
          ok: false,
          err: err.message
        })

        // return the updated product
        res.status(200).json({
          ok: true,
          product: product
        })

      })

    })

  })

}
