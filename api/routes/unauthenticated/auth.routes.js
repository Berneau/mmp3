var jwt = require('jsonwebtoken')
var User = require('../../models/user.model')
var secret = require('../../config').secret

module.exports = function(router) {

  router.route('/auth')

  /**
   * @api {post} /authentication Get JWT
   * @apiName GETJWT
   * @apiGroup Authentication
   * @apiPermission none
   *
   * @apiParam {String} username The username of the user.
   * @apiParam {String} password The password of the user.
   *
   * @apiSuccess {String} token The signed JWT.
 */
  .post(function(req, res) {

    User.findOne({ username: req.body.username }, function(err, user) {
      if (err) res.status(500).end(err)

      if (user) {
        if (user.password == req.body.password) {

          var token = jwt.sign(user, secret, {
            expiresIn: '24h'
          })

          res.status(200).json({ token: token })
        } else res.status(403).json({ message: 'Authentication failed.' })
      } else res.status(403).json({ message: 'Authentication failed.' })

    })
  })

}