var jwt = require('jsonwebtoken')
var password = require('s-salt-pepper')
var secret = require('../../config').secret
var pepper = require('../../config').pepper

var User = require('../../models/user.model')

// set up pepper
password.configure({
  pepper: pepper
})

module.exports = function(router) {

  router.route('/auth')

  /**
   * @api {post} /authentication Get JWT
   * @apiName GETJWT
   * @apiGroup Authentication
   * @apiPermission none
   *
   * @apiParam {String} email The email of the user.
   * @apiParam {String} password The password of the user.
   *
   * @apiSuccess {String} token The signed JWT.
   * @apiSuccess {Object} user The user for the login.
 */
  .post(function(req, res) {

    User.findOne({ email: req.body.email }, function(err, user) {

      // internal server error
      if (err) res.status(500).json({
        ok: false,
        err: err.message
      })

      else if (user) {

        password.compare(req.body.password, user.salt, function(err, hash) {
          if (user.password === hash) {
            var token = jwt.sign(user, secret, {
              expiresIn: '24h'
            })

            // return token and user
            res.status(200).json({
              ok: true,
              token: token,
              user: stripUserObject(user)
            })

            // email and password doesn't match
          } else res.status(403).json({
            ok: false,
            message: 'Authentication failed.'
          })
        })

        // user with this email was not found
      } else res.status(403).json({
        ok: false,
        message: 'Authentication failed.'
      })
    })
  })

  function stripUserObject(user) {
    user.password = undefined
    user.salt = undefined
    return user
  }

}
