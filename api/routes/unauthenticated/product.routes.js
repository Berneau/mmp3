var Product = require('../../models/product.model')

module.exports = function(router) {

  router.route('/products')
  /**
   * @api {get} /products?filter=<filter>&categoryId=<categoryId>&<vendorId=<vendorId> Get all products with optional search, vendor or category
   * @apiName GetProducts
   * @apiGroup Products
   * @apiPermission none
   *
   * @apiParam {String} [categoryId] Id of a category (not combinable with vendorId)
   * @apiParam {String} [vendorId] Id of a vendor (not combinable with categoryId)
   * @apiParam {String} [filter] The field name will be search by this.
   *
   * @apiSuccess {Array} product Array of products.
 */
  .get(function(req, res) {
    var filter = req.query.filter ? req.query.filter : ''
    var categoryId = req.query.categoryId
    var vendorId = req.query.vendorId

    if (categoryId && !vendorId) {

      Product
      .find({ 'categoryId': categoryId }, function(err, products) {

        // internal server error
        if (err) res.status(500).json({
          ok: false,
          err: err.message
        })

        // return product list
        else res.status(200).json({
          ok: true,
          products: products
        })
      })
      .sort({name: 1})

    } else if (vendorId && !categoryId) {

      Product
      .find({ 'vendorId': vendorId }, function(err, products) {

        // internal server error
        if (err) res.status(500).json({
          ok: false,
          err: err.message
        })

        // return product list
        else res.status(200).json({
          ok: true,
          products: products
        })
      })
      .sort({name: 1})

    } else {

      Product
      .find({ 'name': { '$regex': filter } }, function(err, products) {
        // internal server error
        if (err) res.status(500).json({
          ok: false,
          err: err.message
        })

        // return product list
        else res.status(200).json({
          ok: true,
          products: products
        })
      })
      .sort({name: 1})
    }
  })

  router.route('/products/:id')
  /**
   * @api {get} /products/:id Get product
   * @apiName GetProduct
   * @apiGroup Products
   * @apiPermission none
   *
   * @apiSuccess {Object} product The product for given id.
  */
  .get(function(req, res) {
    Product.findById(req.params.id, function(err, product) {

      // internal server err
      if (err && err.name != 'CastError') res.status(404).json({
        ok: false,
        err: err.message
      })

      // return found product object
      else if (!err && product) res.status(200).json({
        ok: true,
        product: product
      })

      // no product was found
      else res.status(404).json({
        ok: false,
        message: 'Product not found'
      })
    })
  })

}
