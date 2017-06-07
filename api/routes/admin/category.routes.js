var Category = require('../../models/category.model')
var Product = require('../../models/product.model')
var categoryIsValid = require('../../helpers/helpers').categoryIsValid
var categoryFactory = require('../../helpers/helpers').categoryFactory

module.exports = function(router) {

  router.route('/categories')
  /**
   * @api {post} /categories Create Category
   * @apiName CreateCategory
   * @apiGroup Categories
   * @apiPermission admin
   *
   * @apiParam {String} name The name of the category
   * @apiParam {String} typeUid The uid of the type (e.g. vegetables)
   * @apiParam {String} [imageUrl] Url to the image of the category
   * @apiParam {String} [imageKey] Key of the image
   *
   * @apiSuccess {Object} category The created category
 */
  .post(function(req, res) {

    // not a valid category Object
    if (!categoryIsValid(req.body)) return res.status(412).json({
      ok: false,
      message: 'Missing fields'
    })

    var category = new Category()
    category = categoryFactory(req.body, category)

    category.save(function(err) {

      //internal server error
      if (err) return res.status(500).json({
        ok: false,
        err: err.message
      })

      // return created category
      res.status(200).json({
        ok: true,
        category: category
      })

    })

  })

  router.route('/categories/:id')
    /**
     * @api {put} /categories/:id Update Category
     * @apiName UpdateCategory
     * @apiGroup Categories
     * @apiPermission admin
     *
     * @apiParam {String} name The name of the category
     * @apiParam {String} typeUid The uid of the type (e.g. vegetables)
     * @apiParam {String} [imageUrl] Url to the image of the category
     * @apiParam {String} [imageKey] Key of the image
     *
     * @apiSuccess {Object} category The updated category
    */
    .put(function(req, res) {

      Category.findById(req.params.id, function(err, category) {

        // not a valid id
        if (err && err.name != 'CastError') return res.status(404).json({
          ok: false,
          err: err.message
        })

        // no category with this id
        if (!category) return res.status(404).json({
          ok: false,
          message: 'Category not found'
        })

        // not a valid category
        if (!categoryIsValid(req.body)) return res.status(412).json({
          ok: false,
          message: 'Missing fields'
        })

        category = categoryFactory(req.body, category)

        category.save(function(err) {

          // internal server error
          if (err) return res.status(500).json({
            ok: false,
            err: err.message
          })

          // return the updated category
          res.status(200).json({
            ok: true,
            category: category
          })
        })

      })

    })

    /**
     * @api {delete} /categories/:id Delete category
     * @apiName DeleteCategory
     * @apiGroup Categories
     * @apiPermission admin
     *
     * @apiSuccess {String} message Success message.
    */
  .delete(function(req, res) {

    Category.findById(req.params.id, function(err, category) {

      // not a valid id
      if (err && err.name != 'CastError') return res.status(404).json({
        ok: false,
        err: err.message
      })

      // no category with this id
      if (!category) return res.status(404).json({
        ok: false,
        message: 'Category not found'
      })

      Product.find({ categoryId: category._id }, function(err, products) {

        // internal server error
        if (err) return res.status(500).json({
          ok: false,
          err: err.message
        })

        // category is in use by products -> do not delete
        if (products.length > 0) return res.status(403).json({
          ok: false,
          message: 'Category is in use by at least one product - not deleted'
        })

        // category is not in use by any products -> delete
        Category.remove({ _id: req.params.id }, function(err, category) {

          // internal server error
          if (err) return res.status(500).json({
            ok: false,
            err: err.message
          })

          // successfully deleted
          res.status(200).json({
            ok: true,
            message: 'Successfully deleted'
          })

        })

      })

    })

  })

}
