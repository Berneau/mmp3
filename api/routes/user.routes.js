var User = require('../models/user.model')

/**
 * @apiDefine NoAccessRights
 * @apiError (Error 403) NoAccessRights The auth <code>token</code> is not valid or missing.
 */

/**
 * @apiDefine MissingFields
 * @apiError (Error 412) MissingFields Required fields are missing.
 */

/**
 * @apiDefine DatabaseError
 * @apiError (Error 500) DatabaseError Error while altering the database.
 */

/**
 * @apiDefine UserNotFound
 * @apiError (Error 404) UserNotFound The user with the given <code>id</code> was not found.
 */


module.exports = function(router) {

  router.route('/user')

  /**
   * @api {post} /product Create User
   * @apiName CreateUser
   * @apiGroup User
   *
   * @apiParam {String} username The name of the user.
   * @apiParam {String} email The email address of the user.
   * @apiParam {String} password The password of the user.
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
        password: req.body.password
      })

      user.save(function(err) {
        if (err) res.status(500).end(err)
        res.status(200).json(user)
      })
    }

  })

  router.route('/users/:skip/:limit/:filter?')
  /**
   * @api {get} /users/:skip/:limit/:filter? Get all users with pagination and optional search
   * @apiName GetUsers
   * @apiGroup User
   *
   * @apiSuccess {Array} user Array of users.
 */
 .get(function(req, res) {

   var filter = req.params.filter ? req.params.filter : ''

   User
   .find({ 'username': { '$regex': filter } }, function(err, users) {
     if (err) res.status(500).end(err)
     res.json(users)
   })
   .sort({name: 1})
   .skip(req.params.skip)
   .limit(req.params.limit)
 })

 router.route('/user/:id')
   /**
    * @api {get} /user/:id Get user
    * @apiName GetUser
    * @apiGroup User
    *
    * @apiSuccess {Object} user The user for given id.
    *
    * @apiUse UserNotFound
   */
   .get(function(req, res) {
     User.findById(req.params.id, function(err, user) {
       if (err) res.status(500).end(err)

       if (user) res.status(200).json(user)
       else res.status(404).json({ message: 'User not found'})
     })
   })

   /**
    * @api {put} /user/:id Update user
    * @apiName UpdateUser
    * @apiGroup User
    *
    * @apiParam {String} username The name of the user.
    * @apiParam {String} email The email address of the user.
    *
    * @apiSuccess {Object} user The updated user.
    *
    * @apiUse MissingFields
    * @apiUse UserNotFound
   */
   .put(function(req, res) {

     User.findById(req.params.id, function(err, user) {
       if (err) res.status(500).end(err)

       if (user) {
         if (userIsValid(req.body)) {

           user.username = req.body.name
           user.email = req.body.email

           user.save(function(err) {
             if (err) res.status(500).end(err)
             res.status(200).json(user)
           })

         } else res.status(412).json({ message: 'Missing fields' })

       } else res.status(404).json({ message: 'User not found'})
     })
   })

   /**
    * @api {delete} /user/:id Delete user
    * @apiName DeleteUser
    * @apiGroup User
    *
    * @apiSuccess {String} message Success message.
    *
    * @apiUse UserNotFound
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


  function userIsValid(user) {
    if (!user.username ||
        !user.password ||
        !user.email) return false
    else return true
  }
}
