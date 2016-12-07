var jwt = require('jsonwebtoken')
var User = require('../models/user.model')
var secret = require('../config').secret

 /**
 * @apiDefine WrongCredentials
 * @apiError (Error 403) WrongCredentials A user with the combination of <code>username</code> and <code>password</code> was not found.
 */


module.exports = function(router) {

  router.route('/auth')

  /**
   * @api {post} /authentication Get JWT
   * @apiName GETJWT
   * @apiGroup Authentication
   *
   * @apiParam {String} username The username of the user.
   * @apiParam {String} password The password of the user.
   *
   * @apiSuccess {String} token The signed JWT.
   *
   * @apiUse WrongCredentials
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

  router.route('/users')
  /**
   * @api {post} /users Create User
   * @apiName CreateUser
   * @apiGroup Users
   *
   * @apiParam {String} username The name of the user.
   * @apiParam {String} email The email address of the user.
   * @apiParam {String} password The password of the user.
   * @apiParam {Boolean} isAdmin Flag if the user has admin rights.
   *
   * @apiSuccess {Object} user The created user.
   *
   * @apiUse MissingFields
 */
  .post(function(req, res) {

    if (!userIsValid(req.body)) {
      res.status(412).json({ message: 'Missing fields' })
    } else {

      var user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        isAdmin: req.body.isAdmin
      })

      user.save(function(err) {
        if (err) res.status(500).end(err)
        res.status(200).json(user)
      })
    }
  })
}
