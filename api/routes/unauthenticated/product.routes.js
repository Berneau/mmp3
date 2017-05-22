var Product = require('../../models/product.model')
var Category = require('../../models/category.model')
var clearDupes = require('../../helpers/helpers').clearDupes

module.exports = function(router) {

  router.route('/products')
  /**
   * @api {get} /products?filter=<filter>&categoryId=<categoryId>&<vendorId=<vendorId> Get all products with optional search by vendor or category
   * @apiName GetProducts
   * @apiGroup Products
   * @apiPermission none
   *
   * @apiParam {String} [filter] Products and categories will be searched by this
   * @apiParam {String} [categoryId] Id of a category (not combinable with vendorId)
   * @apiParam {String} [vendorId] Id of a vendor (not combinable with categoryId)
   *
   * @apiSuccess {Array} product Array of products.
 */
  .get(function(req, res) {
    var categoryId = req.query.categoryId
    var vendorId = req.query.vendorId
    var filter = req.query.filter ? req.query.filter : undefined
    var regex = new RegExp(filter, 'i')


    // test if both categoryId and vendorId are given
    if (categoryId && vendorId) res.status(412).json({
      ok: false,
      err: 'Do not specify both categoryId and vendorId'
    })

    // if only one or none of the ids are given
    else {

      // only categoryId is given
      if (categoryId && !vendorId) {

        Product
        .find({ categoryId: categoryId }, function(err, products) {

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


      // only vendorId is given
      else if (vendorId && !categoryId) {

        Product
        .find({ 'vendor._id': vendorId }, function(err, products) {

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


      // filter is given -> search
      else if (filter) {

        returnedProducts = []

        // find matching products
        Product
        .find({ name: regex }, function(err, products) {

          // internal server error
          if (err) res.status(500).json({
            ok: false,
            err: err.message
          })

          else {
            // add result from products to returned array
            returnedProducts = returnedProducts.concat(products)

            // find products by category
            Category
            .findOne({ name: regex }, function(err, category) {

              // internal server error
              if (err) res.status(500).json({
                ok: false,
                err: err.message
              })

              // a category was found -> search for products
              else if (category) {

                Product
                .find({ categoryId: category._id }, function(err, productsFromCategory) {

                  // internal server error
                  if (err) res.status(500).json({
                    ok: false,
                    err: err.message
                  })

                  else {
                    // add result from search by category to returned array
                    returnedProducts = returnedProducts.concat(productsFromCategory)
                    res.status(200).json({
                      ok: true,
                      products: clearDupes(returnedProducts)
                    })
                  }

                })

              }


              // no category was found -> return found products
              else res.status(200).json({
                ok: true,
                products: returnedProducts
              })


            })
          }

        })

      }


      // only return list
      else {

        Product
        .find({}, function(err, products) {

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
