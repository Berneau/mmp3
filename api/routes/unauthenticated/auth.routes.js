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
 */
  .post(function(req, res) {

    User.findOne({ email: req.body.email }, function(err, user) {
      if (err) res.status(500).end(err)

      if (user) {

        password.compare(user.password, user.salt, function(err, hash) {
          if (user.hash === hash) {
            var token = jwt.sign(user, secret, {
              expiresIn: '24h'
            })

            res.status(200).json({ token: token })
          } else res.status(403).json({ message: 'Authentication failed.' })
        })
      } else res.status(403).json({ message: 'Authentication failed.' })
    })
  })

}
