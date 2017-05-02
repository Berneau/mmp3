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
}
