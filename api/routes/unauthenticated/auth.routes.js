var jwt = require('jsonwebtoken')
var password = require('s-salt-pepper')
var secret = require('../../config').secret
var pepper = require('../../config').pepper

var User = require('../../models/user.model')
var stripUserObject = require('../../helpers/helpers').stripUserObject

// set up pepper
password.configure({
  pepper: pepper
})

module.exports = function(router) {

  router.route('/auth')

  /**
   * @api {post} /auth Get JWT
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
      if (err) return res.status(500).json({
        ok: false,
        err: err.message
      })

      // user with this email was not found
      if (!user) return res.status(403).json({
        ok: false,
        message: 'Authentication failed.'
      })

      password.compare(req.body.password, user.salt, function(err, hash) {

        // email and password doesn't match
        if (user.password !== hash) return res.status(403).json({
          ok: false,
          message: 'Authentication failed.'
        })

        var token = jwt.sign(user, secret, {
          expiresIn: '24h'
        })

        // return token and user
        res.status(200).json({
          ok: true,
          token: token,
          user: stripUserObject(user)
        })

      })

    })
  })

}
