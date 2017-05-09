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

      // not a valid product
      res.status(412).json({
        ok: false,
        message: 'Missing fields'
      })

    } else {

      var product = new Product({
        name: req.body.name,
        categoryId: req.body.categoryId,
        vendorId: req.body.vendorId,
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
        if (err) res.status(500).json({
          ok: false,
          err: err.message
        })

        // return the created product
        else res.status(200).json({
          ok: true,
          product: product
        })
      })
    }
  })

}
