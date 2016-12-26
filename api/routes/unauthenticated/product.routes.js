var Product = require('../../models/product.model')

module.exports = function(router) {

  router.route('/products')
  /**
   * @api {get} /products?skip=<skip>&limit=<limit>&filter=<filter> Get all products with pagination and optional search
   * @apiName GetProducts
   * @apiGroup Products
   *
   * @apiParam {Number} [skip] Pages to be skipped.
   * @apiParam {Number} [limit] Elements to be contained in one page.
   * @apiParam {String} [filter] The field name will be search by this.
   *
   * @apiSuccess {Array} product Array of products.
 */
  .get(function(req, res) {
    var skip = req.query.skip ? req.query.skip : 0
    var limit = req.query.limit ? req.query.limit : 0
    var filter = req.query.filter ? req.query.filter : ''

    Product
    .find({ 'name': { '$regex': filter } }, function(err, products) {
      if (err) res.status(500).json(err.message)
      res.json(products)
    })
    .sort({name: 1})
    .skip(parseInt(skip))
    .limit(parseInt(limit))
  })


  router.route('/products/:id')
  /**
   * @api {get} /products/:id Get product
   * @apiName GetProduct
   * @apiGroup Products
   *
   * @apiSuccess {Object} product The product for given id.
  */
  .get(function(req, res) {
    Product.findById(req.params.id, function(err, product) {

      if (err && err.name != 'CastError') res.status(404).json(err.message)
      else if (!err && product) res.status(200).json(product)
      else res.status(404).json({ message: 'Product not found' })
    })
  })

}
