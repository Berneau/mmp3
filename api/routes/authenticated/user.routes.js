var User = require('../../models/user.model')
var stripUserObject = require('../../helpers/helpers').stripUserObject

module.exports = function(router) {

  router.route('/users/:id')
  /**
  * @api {get} /users/:id Get user
  * @apiName GetUser
  * @apiGroup Users
  * @apiPermission authenticated
  *
  * @apiSuccess {Object} user The user for given id.
  */
  .get(function(req, res) {
    User.findById(req.params.id, function(err, user) {

      // internal server error
      if (err) return res.status(500).json({
        ok: false,
        err: err.message
      })

      // no user with this id
      if (!user) return res.status(404).json({
        ok: false,
        message: 'User not found'
      })

      // return user object
      res.status(200).json({
        ok: true,
        user: stripUserObject(user)
      })

    })

  })

}
