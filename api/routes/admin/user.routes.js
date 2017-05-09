var User = require('../../models/user.model')
var userIsValid = require('../../helpers/helpers').userIsValid
var stripUserObject = require('../../helpers/helpers').stripUserObject
var stripUserArray = require('../../helpers/helpers').stripUserArray

module.exports = function(router) {

  router.route('/users')
  /**
  * @api {get} /users?filter=<filter> Get all users with optional search
  * @apiName GetUsers
  * @apiGroup Users
  * @apiPermission admin
  *
  * @apiParam {String} [filter] The field name will be search by this.
  *
  * @apiSuccess {Array} user Array of users.
  */
  .get(function(req, res) {

  var filter = req.query.filter ? req.query.filter : ''

  User
  .find({ 'email': { '$regex': filter } }, function(err, users) {

    // internal server error
    if (err) res.status(500).json({
      ok: false,
      err: err.message
    })

    // return user list
    else res.json({
      ok: true,
      users: stripUserArray(users)
    })
  })
  .sort({email: 1})
  })

  router.route('/users/:id')
  /**
  * @api {get} /users/:id Get user
  * @apiName GetUser
  * @apiGroup Users
  * @apiPermission admin
  *
  * @apiSuccess {Object} user The user for given id.
  */
  .get(function(req, res) {
   User.findById(req.params.id, function(err, user) {

     // internal server error
     if (err) res.status(500).json({
       ok: false,
       err: err.message
     })

     // return user object
     else if (user) res.status(200).json({
       ok: true,
       user: stripUserObject(user)
     })

     // no user with this id
     else res.status(404).json({
       ok: false,
       message: 'User not found'
     })
   })
  })

  /**
  * @api {delete} /users/:id Delete user
  * @apiName DeleteUser
  * @apiGroup Users
  * @apiPermission admin
  *
  * @apiSuccess {String} message Success message.
  */
  .delete(function(req, res) {
   User.findById(req.params.id, function(err, user) {
     if (err) res.status(500).end(err)

     if (user) {
       User.remove({ _id: req.params.id }, function(err, user) {
         if (err) res.status(500).end(err)
         res.status(200).json({ message: 'Successfully deleted' })
       })
     } else res.status(404).json({ message: 'User not found'})

   })
  })

}
