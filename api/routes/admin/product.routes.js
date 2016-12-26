var Product = require('../../models/product.model')

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


  router.route('/products/:id')
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
    */
    .put(function(req, res) {

      Product.findById(req.params.id, function(err, product) {
        if (err && err.name != 'CastError') res.status(404).json(err.message)

        else if (!err && product) {
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
          !product.season ||
          !product.category) return false
      else return true
    }
}
