var express = require('express')
var router = express.Router()
var Product = require('.././models/product')

// middlewares
// router.use(function(req, res, next) {
//   console.log("I'm a Middleware")
//   next()
// })


router.get('/', function(req, res) {
  res.json({ message: 'UNICORN' })
})


router.route('/products')

  /**
   * @api {post} /products Create Product
   * @apiName CreateProduct
   * @apiGroup Product
   *
   * @apiParam {String} name The name of the product.
   * @apiParam {String} description A short description.
   * @apiParam {String} imageUrl The url to the image.
   * @apiParam {number} category The id of the category.
   *
   * @apiSuccess {Object} product The created product.
 */
  .post(function(req, res) {

      var product = new Product()
      product.name = req.body.name

      product.save(function(err) {
        if (err) res.send(err)
        res.json(product)
      })
  })

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
     })
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



module.exports = router
