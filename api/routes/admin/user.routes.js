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

  User
  .find({}, function(err, users) {

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
      if (err && err.name != 'CastError') res.status(404).json({
        ok: false,
        err: err.message
      })

      else if (!err && user) {

        if (userIsValid(req.body)) {

          password.hash(req.body.password, function(err, salt, hash) {

            // error during hashing
            if (err) res.status(500).json({
              ok: false,
              err: err.message
            })

            else {

              user.email = req.body.email
              user.password = hash
              user.salt = salt
              user.isAdmin = req.body.isAdmin

              user.save(function(err) {

                // internal server error
                if (err) res.status(500).json({
                  ok: false,
                  err: err.message
                })

                // return the updated user
                else res.status(200).json({
                  ok: true,
                  user: stripUserObject(user)
                })

              })

            }

          })

          // not a valid user
        } else res.status(412).json({
          ok: false,
          message: 'Missing fields'
        })

        // no user with this id
      } else res.status(404).json({
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
