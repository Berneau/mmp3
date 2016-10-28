var Product = require('.././models/product.model')

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

  router.route('/product')

    /**
     * @api {post} /product Create Product
     * @apiName CreateProduct
     * @apiGroup Product
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


  router.route('/products/:skip/:limit/:filter?')
    /**
     * @api {get} /products/:skip/:limit/:filter? Get all products with pagination and optional search
     * @apiName GetProducts
     * @apiGroup Product
     *
     * @apiSuccess {Array} product Array of products.
   */
    .get(function(req, res) {

      var filter = req.params.filter ? req.params.filter : ''

      Product
      .find({ 'name': { '$regex': filter } }, function(err, products) {
        if (err) res.status(500).end(err)
        res.json(products)
      })
      .sort({name: 1})
      .skip(req.params.skip)
      .limit(req.params.limit)
    })


  router.route('/product/:id')
    /**
     * @api {get} /product/:id Get product
     * @apiName GetProduct
     * @apiGroup Product
     *
     * @apiSuccess {Object} product The product for given id.
     *
     * @apiUse ProductNotFound
    */
    .get(function(req, res) {
      Product.findById(req.params.id, function(err, product) {
        if (err) res.status(500).end(err)

        if (product) res.status(200).json(product)
        else res.status(404).json({ message: 'Product not found'})
      })
    })

    /**
     * @api {put} /product/:id Update product
     * @apiName UpdateProduct
     * @apiGroup Product
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
     * @api {delete} /product/:id Delete product
     * @apiName DeleteProduct
     * @apiGroup Product
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
