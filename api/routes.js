var express = require('express')
var jwt = require('jsonwebtoken')
var secret = require('./config').secret
var router = express.Router()


// unauthenticated routes
require('./routes/unauthenticated/user.routes')(router)
require('./routes/unauthenticated/auth.routes')(router)
require('./routes/unauthenticated/product.routes')(router)
require('./routes/unauthenticated/vendor.routes')(router)
require('./routes/unauthenticated/category.routes')(router)

// authentication
router.use(function(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token']

  if (token) {
    // verifies secret and checks expiration
    jwt.verify(token, secret, function(err, decoded) {
      if (err) return res.status(403).json({ message: 'Authentication failed' })
      else next()
    })

  } else return res.status(412).json({ message: 'No token provided' })
})

// admin check
router.use(function(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token']

  // TODO: change to simple decoding
  jwt.verify(token, secret, function(err, decoded) {
    if (!decoded._doc.isAdmin) return res.status(403).json({ message: 'Admin rights required'})
    else next()
  })
})

// admin routes
require('./routes/admin/product.routes')(router)
require('./routes/admin/user.routes')(router)
require('./routes/admin/vendor.routes')(router)


module.exports = router
