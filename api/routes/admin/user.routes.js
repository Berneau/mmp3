var password = require('s-salt-pepper')

var User = require('../../models/user.model')
var userIsValid = require('../../helpers/helpers').userIsValid
var stripUserObject = require('../../helpers/helpers').stripUserObject
var stripUserArray = require('../../helpers/helpers').stripUserArray

module.exports = function(router) {

  router.route('/users')
  /**
  * @api {get} /users Get all users
  * @apiName GetUsers
  * @apiGroup Users
  * @apiPermission admin
  *
  * @apiSuccess {Array} user Array of users.
  */
  .get(function(req, res) {

    User.find({}, function(err, users) {

      // internal server error
      if (err) return res.status(500).json({
        ok: false,
        err: err.message
      })

      // return user list
      res.status(200).json({
        ok: true,
        users: stripUserArray(users)
      })

    })
    .sort({email: 1})
  })

  router.route('/users/:id')
  /**
  * @api {put} /users/:id Update user
  * @apiName UpdateUser
  * @apiGroup Users
  * @apiPermission admin
  *
  * @apiParam {String} password For resetting the password.
  *
  * @apiSuccess {Object} user The updated user object.
 */
  .put(function(req, res) {

    User.findById(req.params.id, function(err, user) {

      // not a valid id
      if (err && err.name != 'CastError') return res.status(404).json({
        ok: false,
        err: err.message
      })

      // no user with this id
      if (!user) return res.status(404).json({
        ok: false,
        message: 'User not found'
      })

      // not a valid user
      if (!userIsValid(req.body)) return res.status(412).json({
        ok: false,
        message: 'Missing fields'
      })

      password.hash(req.body.password, function(err, salt, hash) {

        // error during hashing
        if (err) return res.status(500).json({
          ok: false,
          err: err.message
        })

        user.email = req.body.email
        user.password = hash
        user.salt = salt
        user.isAdmin = req.body.isAdmin

        user.save(function(err) {

          // internal server error
          if (err) return res.status(500).json({
            ok: false,
            err: err.message
          })

          // return the updated user
          res.status(200).json({
            ok: true,
            user: stripUserObject(user)
          })

        })

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

      // internal server error
      if (err) return res.status(500).json({
        ok: false,
        err: err.message
      })

      // no user for this id
      if (!user) res.status(404).json({
        ok: false,
        message: 'User not found'
      })

      User.remove({ _id: req.params.id }, function(err, user) {

        // internal server error
        if (err) return res.status(500).json({
          ok: false,
          err: err.message
        })

        // return the success message
        res.status(200).json({
          ok: true,
          message: 'Successfully deleted'
        })

      })

    })

  })

}
