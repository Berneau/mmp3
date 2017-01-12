var User = require('../../models/user.model')

module.exports = function(router) {

  router.route('/users')
  /**
   * @api {get} /users?skip=<skip>&limit=<limit>&filter=<filter> Get all users with pagination and optional search
   * @apiName GetUsers
   * @apiGroup Users
   * @apiPermission none
   *
   * @apiParam {Number} [skip] Pages to be skipped.
   * @apiParam {Number} [limit] Elements to be contained in one page.
   * @apiParam {String} [filter] The field name will be search by this.
   *
   * @apiSuccess {Array} user Array of users.
 */
 .get(function(req, res) {

   var skip = req.query.skip ? req.query.skip : 0
   var limit = req.query.limit ? req.query.limit : 0
   var filter = req.query.filter ? req.query.filter : ''

   User
   .find({ 'username': { '$regex': filter } }, function(err, users) {
     if (err) res.status(500).end(err)
     res.json(users)
   })
   .sort({name: 1})
   .skip(skip)
   .limit(limit)
 })

  router.route('/users/:id')
    /**
     * @api {get} /users/:id Get user
     * @apiName GetUser
     * @apiGroup Users
     * @apiPermission none
     *
     * @apiSuccess {Object} user The user for given id.
    */
    .get(function(req, res) {
      User.findById(req.params.id, function(err, user) {
        if (err) res.status(500).json(err.message)

        if (user) res.status(200).json(user)
        else res.status(404).json({ message: 'User not found'})
      })
    })

    /**
     * @api {post} /users Create User
     * @apiName CreateUser
     * @apiGroup Users
     * @apiPermission none
     *
     * @apiParam {String} username The name of the user.
     * @apiParam {String} email The email address of the user.
     * @apiParam {String} password The password of the user.
     * @apiParam {Boolean} isAdmin Flag if the user has admin rights.
     *
     * @apiSuccess {Object} user The created user.
   */
    .post(function(req, res) {

      if (userIsValid(req.body)) {
        if (userIsFree(req.body)) {

            var user = new User({
              username: req.body.username,
              email: req.body.email,
              password: req.body.password,
              isAdmin: req.body.isAdmin
            })

            user.save(function(err) {
              if (err) res.status(500).json(err.message)
              res.status(200).json(user)
            })

        } else {
          res.status(412).json({ message: 'Username already taken' })
        }
      } else {
        res.status(412).json({ message: 'Missing fields' })
      }
    })

    function userIsValid(user) {
      if (!user.username ||
          !user.password ||
          !user.email ||
          !user.isAdmin) return false
      else return true
    }

    function userIsFree(user) {
      User.findOne({ username: user.username }, function(err, user) {
        if (err) res.status(500).json(err.message)

        if (user) return false
        else return true
      })
    }

}
