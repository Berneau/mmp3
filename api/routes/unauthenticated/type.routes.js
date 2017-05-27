var Type = require('../../models/type.model')

module.exports = function(router) {

  router.route('/types')
  /**
   * @api {get} /types Get all types
   * @apiName GetTypes
   * @apiGroup Types
   * @apiPermission none
   *
   * @apiSuccess {Array} types Array of types.
 */
 .get(function(req, res) {

   Type.find({}, function(err, types) {

     // internal server error
     if (err) return res.status(500).json({
       ok: false,
       err: err.message
     })

     // return type list
     res.status(200).json({
       ok: true,
       types: types
     })

   })
   .sort({name: 1})
 })

 router.route('/types/:id')
   /**
    * @api {get} /types/:id Get type
    * @apiName GetType
    * @apiGroup Types
    * @apiPermission none
    *
    * @apiSuccess {Object} type The type for given id.
   */
   .get(function(req, res) {

     Type.findById(req.params.id, function(err, type) {

       // internal server error
       if (err && err.name != 'CastError') return res.status(404).json({
         ok: false,
         err: err.message
       })

       // no type found for this id
       if (!type) return res.status(404).json({
         ok: false,
         message: 'Type not found'
       })

       // return found type Object
       res.status(200).json({
         ok: true,
         type: type
       })

     })

   })

}
