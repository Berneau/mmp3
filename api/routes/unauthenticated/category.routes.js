var Category = require('../../models/category.model')

module.exports = function(router) {

  router.route('/categories')
  /**
   * @api {get} /categories?filter=<filter> Get all categories with optional search
   * @apiName GetCategories
   * @apiGroup Categories
   * @apiPermission none
   *
   * @apiParam {String} [filter] The field name will be search by this.
   *
   * @apiSuccess {Array} vendor Array of categories.
 */
 .get(function(req, res) {

   var filter = req.query.filter ? req.query.filter : ''

   Category
   .find({ 'name': { '$regex': filter } }, function(err, categories) {
     if (err) res.status(500).end(err)
     res.json(categories)
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

       if (err && err.name != 'CastError') res.status(404).json(err.message)
       else if (!err && category) res.status(200).json(category)
       else res.status(404).json({ message: 'Category not found'})
     })
   })

}
