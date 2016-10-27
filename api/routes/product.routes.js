var Product = require('.././models/product.model')

module.exports = function(router) {

  router.route('/products')

    /**
     * @api {post} /products Create Product
     * @apiName CreateProduct
     * @apiGroup Product
     *
     * @apiParam {String} name The name of the product.
     * @apiParam {String} description A short description.
     * @apiParam {String} season The availability of the product.
     * @apiParam {String} imageUrl The url to the image.
     * @apiParam {number} category The id of the category.
     *
     * @apiSuccess {Object} product The created product.
   */
    .post(function(req, res) {

      var product = new Product({
        name: req.body.name,
        description: req.body.description,
        season: req.body.season,
        imageUrl: req.body.imageUrl,
        category: req.body.category
      })

      product.save(function(err) {
        if (err) res.send(err)
        res.json(product)
      })
    })


  router.route('/products')
    /**
     * @api {get} /products Get all products
     * @apiName GetProducts
     * @apiGroup Product
     *
     * @apiSuccess {Array} product Array of all products.
   */
    .get(function(req, res) {

      Product.find(function(err, products) {
        if (err) res.send(err)
        res.json(products)
      }).sort({name: 1})
    })


  router.route('/products/:product_id')

    /**
     * @api {get} /products/:product_id Get product
     * @apiName GetProduct
     * @apiGroup Product
     *
     * @apiParam {String} id The id of the product.
     *
     * @apiSuccess {Object} product The product for given id.
    */
    .get(function(req, res) {
      Product.findById(req.params.product_id, function(err, product) {
        if (err) res.send(err)
        console.log(product)
        res.json(product)
      })
    })

    /**
     * @api {put} /products/:product_id Update product
     * @apiName UpdateProduct
     * @apiGroup Product
     *
     * @apiParam {String} name The name of the product.
     * @apiParam {String} description A short description.
     * @apiParam {String} imageUrl The url to the image.
     * @apiParam {number} category The id of the category.
     *
     * @apiSuccess {Object} product The updated product.
    */
    .put(function(req, res) {

      Product.findById(req.params.product_id, function(err, product) {
        if (err) res.send(err)

        product.name = req.body.name
        product.description = req.body.description
        product.season = req.body.season
        product.imageUrl = req.body.imageUrl
        product.category = req.body.category

        product.save(function(err) {
          if (err) res.send(err)
          res.json({ message: 'Product updated!' })
        })
      })
    })

    /**
     * @api {delete} /products/:product_id Delete product
     * @apiName DeleteProduct
     * @apiGroup Product
     *
     * @apiParam {String} id The id of the product.
     *
     * @apiSuccess {Object} product The deleted product.
    */
    .delete(function(req, res) {
      Product.remove({
        _id: req.params.product_id
      }, function(err, product) {
        if (err) res.send(err)
        res.json({ message: 'Successfully deleted' })
      })
    })
}
