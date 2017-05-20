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
   * @apiSuccess {Array} category Array of categories.
 */
 .get(function(req, res) {

   var filter = req.query.filter ? req.query.filter : ''
   var regex = new RegExp(filter, 'i')

   Category
   .find({ name : filter }, function(err, categories) {

     // internal server error
     if (err) res.status(500).json({
       ok: false,
       err: err.message
     })

     // return category list
     else res.status(200).json({
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
       if (err && err.name != 'CastError') res.status(404).json({
         ok: false,
         err: err.message
       })

       // return found category object
       else if (!err && category) res.status(200).json({
         ok: true,
         category: category
       })

       // no category was found
       else res.status(404).json({
         ok: false,
         message: 'Category not found'
       })
     })
   })

}
