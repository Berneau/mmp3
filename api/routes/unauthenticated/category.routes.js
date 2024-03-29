var Category = require('../../models/category.model')

module.exports = function(router) {

  router.route('/categories')
  /**
   * @api {get} /categories Get all categories
   * @apiName GetCategories
   * @apiGroup Categories
   * @apiPermission none
   *
   * @apiSuccess {Array} category Array of categories.
 */
  .get(function(req, res) {

    var filter = req.query.filter ? req.query.filter : ''

    Category.find({}, function(err, categories) {

     // internal server error
     if (err) return res.status(500).json({
       ok: false,
       err: err.message
     })

     // return category list
     res.status(200).json({
       ok: true,
       categories: categories
     })
    })
    .sort({name: 1})
  })

  router.route('/categories/:id')
   /**
    * @api {get} /categories/:id Get category
    * @apiName GetCategory
    * @apiGroup Categories
    * @apiPermission none
    *
    * @apiSuccess {Object} category The category for given id.
   */
  .get(function(req, res) {

    Category.findById(req.params.id, function(err, category) {

      // internal server err
      if (err && err.name != 'CastError') return res.status(404).json({
        ok: false,
        err: err.message
      })

      // no category was found
      if (!category) return res.status(404).json({
        ok: false,
        message: 'Category not found'
      })

      // return found category object
      res.status(200).json({
        ok: true,
        category: category
      })

    })
  })

}
