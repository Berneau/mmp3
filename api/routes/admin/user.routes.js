var User = require('../../models/user.model')

module.exports = function(router) {

 router.route('/users/:id')
   /**
    * @api {get} /users/:id Get user
    * @apiName GetUser
    * @apiGroup Users
    *
    * @apiSuccess {Object} user The user for given id.
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
