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

   Type
   .find({}, function(err, types) {

     // internal server error
     if (err) res.status(500).json({
       ok: false,
       err: err.message
     })

     // return type list
     else res.status(200).json({
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
       if (err && err.name != 'CastError') res.status(404).json({
         ok: false,
         err: err.message
       })

       // return found type Object
       else if (!err && type) res.status(200).json({
         ok: true,
         type: type
       })

       // no type found for this id
       else res.status(404).json({
         ok: false,
         message: 'Type not found'
       })
     })
   })
}
