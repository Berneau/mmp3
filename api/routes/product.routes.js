var Product = require('.././models/product.model')

module.exports = function(router) {

  router.route('/product')

    /**
     * @api {post} /product Create Product
     * @apiName CreateProduct
     * @apiGroup Product
     *
     * @apiParam {String} name The name of the product.
     * @apiParam {String} description A short description.
     * @apiParam {String} season The availability of the product.
     * @apiParam {String} imageUrl The url to the image.
     * @apiParam {Number} category The id of the category.
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
        if (err) res.send(err)
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
    */
    .get(function(req, res) {
      Product.findById(req.params.id, function(err, product) {
        if (err) res.send(err)
        console.log(product)
        res.json(product)
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
     * @apiParam {String} imageUrl The url to the image.
     * @apiParam {Number} category The id of the category.
     *
     * @apiSuccess {Object} product The updated product.
    */
    .put(function(req, res) {

      Product.findById(req.params.id, function(err, product) {
        if (err) res.send(err)

        // TODO: tidy?
        product.name = req.body.name
        product.description = req.body.description
        product.season = req.body.season
        product.imageUrl = req.body.imageUrl
        product.category = req.body.category

        product.save(function(err) {
          if (err) res.send(err)
          res.json(product)
        })
      })
    })

    /**
     * @api {delete} /product/:id Delete product
     * @apiName DeleteProduct
     * @apiGroup Product
     *
     * @apiSuccess {String} message Success message.
    */
    .delete(function(req, res) {
      Product.remove({
        _id: req.params.id
      }, function(err, product) {
        if (err) res.send(err)
        res.json({ message: 'Successfully deleted' })
      })
    })
}
