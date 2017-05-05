var password = require('s-salt-pepper')

var User = require('../../models/user.model')

module.exports = function(router) {

  router.route('/users')
 /**
  * @api {post} /users Create User
  * @apiName CreateUser
  * @apiGroup Users
  * @apiPermission none
  *
  * @apiParam {String} email The email address of the user.
  * @apiParam {String} password The password of the user.
  * @apiParam {Boolean} isAdmin Flag for admin rights.
  *
  * @apiSuccess {Object} user The created user.
*/
  .post(function(req, res) {

   if (userIsValid(req.body)) {

     password.hash(req.body.password, function(err, salt, hash) {
       if (err) res.status(500).json(err.message)
       else {
         var user = new User({
           email: req.body.email,
           password: hash,
           salt: salt,
           isAdmin: req.body.isAdmin
         })

         user.save(function(err) {
           if (err) {
             // Err Code 11000 = duplicate Key in MongoDB
             if (err.code == 11000) res.status(200).json({ message: 'Email already taken.' })
             else res.status(500).json(err.message)
           }
           else res.status(200).json(stripUserObject(user))
         })
       }

     })

   } else {
     res.status(412).json({ message: 'Missing fields' })
   }
  })

  function userIsValid(user) {
    if (!user.password ||
        !user.email ||
        !user.isAdmin) return false
    else return true
  }

  function stripUserObject(user) {
    user.password = undefined
    user.salt = undefined
    return user
  }
}
