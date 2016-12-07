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

  router.route('/users')
  /**
   * @api {get} /users?skip=<skip>&limit=<limit>&filter=<filter> Get all users with pagination and optional search
   * @apiName GetUsers
   * @apiGroup Users
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
    * @api {put} /users/:id Update user
    * @apiName UpdateUser
    * @apiGroup Users
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
    * @api {delete} /users/:id Delete user
    * @apiName DeleteUser
    * @apiGroup Users
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
        !user.email ||
        !user.isAdmin) return false
    else return true
  }
}
