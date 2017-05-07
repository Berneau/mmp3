var Category = require('../../models/category.model')

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
   *
   * @apiSuccess {Object} category The created category
 */
  .post(function(req, res) {

    if (!categoryIsValid(req.body)) {

      // not a valid category Object
      res.status(412).json({
        ok: false,
        message: 'Missing fields'
      })
    } else {

      var category = new Category({
        name: req.body.name,
        typeUid: req.body.typeUid,
        imageUrl: req.body.imageUrl
      })

      category.save(function(err) {

        //internal server error
        if (err) res.status(500).end({
          ok: false,
          err: err
        })

        // return created category
        res.status(200).json({
          ok: true,
          category: category
        })
      })
    }

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
     *
     * @apiSuccess {Object} category The updated category
    */
    .put(function(req, res) {

      Category.findById(req.params.id, function(err, category) {

        // not a valid id
        if (err && err.name != 'CastError') res.status(404).json({
          ok: false,
          err: err.message
        })

        else if (!err && category) {
          if (categoryIsValid(req.body)) {

            category.name = req.body.name,
            category.typeUid = req.body.typeUid,
            category.imageUrl = req.body.imageUrl

            category.save(function(err) {

              // internal server error
              if (err) res.status(500).end({
                ok: false,
                err: err
              })

              // return the updated category
              res.status(200).json({
                ok: true,
                category: category
              })
            })

            // not a valid category
          } else res.status(412).json({
            ok: false,
            message: 'Missing fields'
          })

          // no category with this id
        } else res.status(404).json({
          ok: false,
          message: 'Category not found'
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
         if (err && err.name != 'CastError') res.status(404).json({
           ok: false,
           err: err.message
         })

         else if (!err && category) {
           Category.remove({ _id: req.params.id }, function(err, category) {

             // internal server error
             if (err) res.status(500).end({
               ok: false,
               err: err
             })

             // successfully deleted
             res.status(200).json({
               ok: true,
               message: 'Successfully deleted'
             })
           })

           // no category with this id
         } else res.status(404).json({
           ok: false,
           message: 'Category not found'
         })
       })
     })

  function categoryIsValid(category) {
    if (!category.name ||
        !category.typeUid) return false
    else return true
  }
}
