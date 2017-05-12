var password = require('s-salt-pepper')

var User = require('../../models/user.model')
var userIsValid = require('../../helpers/helpers').userIsValid
var stripUserObject = require('../../helpers/helpers').stripUserObject
var emailIsValid = require('../../helpers/helpers').emailIsValid

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

     if (emailIsValid(req.body.email)) {

       password.hash(req.body.password, function(err, salt, hash) {

         // error during hashing
         if (err) res.status(500).json({
           ok: false,
           err: err.message
         })

         else {
           var user = new User({
             email: req.body.email,
             password: hash,
             salt: salt,
             isAdmin: req.body.isAdmin
           })

           user.save(function(err) {
             if (err) {

               // Err Code 11000 = duplicate Key in MongoDB, email already exists
               if (err.code == 11000) res.status(200).json({
                 ok: false,
                 message: 'Email already taken.'
               })

               // internal server error
               else res.status(500).json({
                 ok: false,
                 err: err.message
               })
             }

             // return created user object
             else res.status(200).json({
               ok: true,
               user: stripUserObject(user)
             })
           })
         }

       })

     }

     // no valid email address
     else res.status(412).json({
       ok: false,
       message: 'Not a valid email address'
     })

     // no valid user object
   } else res.status(412).json({
     ok: false,
     message: 'Not a valid user object'
   })
  })

}
