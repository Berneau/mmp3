var Product = require('../models/product.model')

/**
 * @apiDefine NoAccessRights
 * @apiError (Error 403) NoAccessRights The auth <code>token</code> is not valid or missing.
 */

/**
 * @apiDefine MissingFields
 * @apiError (Error 412) MissingFields Required fields are missing.
 */

/**
 * @apiDefine DatabaseError
 * @apiError (Error 500) DatabaseError Error while altering the database.
 */

/**
 * @apiDefine ProductNotFound
 * @apiError (Error 404) ProductNotFound The product with the given <code>id</code> was not found.
 */


module.exports = function(router) {

  router.route('/products')
  /**
   * @api {post} /products Create Product
   * @apiName CreateProduct
   * @apiGroup Products
   *
   * @apiParam {String} name The name of the product.
   * @apiParam {String} season The availability of the product.
   * @apiParam {Number} category The id of the category.
   * @apiParam {String} [description] A short description.
   * @apiParam {String} [imageUrl] The url to the image.
   *
   * @apiSuccess {Object} product The created product.
   *
   * @apiUse MissingFields
 */
  .post(function(req, res) {

    if (!productIsValid(req.body)) {
      res.status(412).json({ message: 'Missing fields' })
    } else {

      var product = new Product({
        name: req.body.name,
        description: req.body.description,
        season: req.body.season,
        imageUrl: req.body.imageUrl,
        category: req.body.category
      })

      product.save(function(err) {
        if (err) res.status(500).end(err)
        res.status(200).json(product)
      })
    }

  })

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
      if (err) res.status(500).end(err)
      res.json(products)
    })
    .sort({name: 1})
    .skip(skip)
    .limit(limit)
  })


  router.route('/products/:id')
    /**
     * @api {get} /products/:id Get product
     * @apiName GetProduct
     * @apiGroup Products
     *
     * @apiSuccess {Object} product The product for given id.
     *
     * @apiUse ProductNotFound
    */
    .get(function(req, res) {
      Product.findById(req.params.id, function(err, product) {

        if (err && err.name != 'CastError') res.status(404).json(err.message)
        else if (!err && product) res.status(200).json(product)
        else res.status(404).json({ message: 'Product not found' })
      })
    })

    /**
     * @api {put} /products/:id Update product
     * @apiName UpdateProduct
     * @apiGroup Products
     *
     * @apiParam {String} name The name of the product.
     * @apiParam {String} description A short description.
     * @apiParam {String} season The availability of the product.
     * @apiParam {String} [imageUrl] The url to the image.
     * @apiParam {Number} [category] The id of the category.
     *
     * @apiSuccess {Object} product The updated product.
     *
     * @apiUse MissingFields
     * @apiUse ProductNotFound
    */
    .put(function(req, res) {

      Product.findById(req.params.id, function(err, product) {
        if (err) res.status(500).end(err)

        if (product) {
          if (productIsValid(req.body)) {

            product.name = req.body.name
            product.description = req.body.description
            product.season = req.body.season
            product.imageUrl = req.body.imageUrl
            product.category = req.body.category

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
     *
     * @apiSuccess {String} message Success message.
     *
     * @apiUse ProductNotFound
    */
    .delete(function(req, res) {
      Product.findById(req.params.id, function(err, product) {
        if (err) res.status(500).end(err)

        if (product) {
          Product.remove({ _id: req.params.id }, function(err, product) {
            if (err) res.status(500).end(err)
            res.status(200).json({ message: 'Successfully deleted' })
          })
        } else res.status(404).json({ message: 'Product not found'})

      })
    })


    function productIsValid(product) {
      if (!product.name ||
          !product.season ||
          !product.category) return false
      else return true
    }
}
