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
require('./routes/unauthenticated/type.routes')(router)
require('./routes/unauthenticated/event.routes')(router)
require('./routes/unauthenticated/postit.routes')(router)

// authentication
router.use(function(req, res, next) {

  var token = req.body.token || req.query.token || req.headers['x-access-token']

  if (!token) return res.status(412).json({
    ok: false,
    message: 'No token provided'
  })

  // verifies secret and checks expiration
  jwt.verify(token, secret, function(err, decoded) {

    if (err) return res.status(403).json({
      ok: false,
      message: 'Authentication failed'
    })

    next()

  })

})

// authenticated routes
require('./routes/authenticated/product.routes')(router)
require('./routes/authenticated/postit.routes')(router)
require('./routes/authenticated/user.routes')(router)

// admin check
router.use(function(req, res, next) {

  var token = req.body.token || req.query.token || req.headers['x-access-token']

  jwt.verify(token, secret, function(err, decoded) {

    if (!decoded._doc.isAdmin) return res.status(403).json({
      ok: false,
      message: 'Admin rights required'
    })

    next()

  })

})

// admin routes
require('./routes/admin/product.routes')(router)
require('./routes/admin/user.routes')(router)
require('./routes/admin/vendor.routes')(router)
require('./routes/admin/category.routes')(router)
require('./routes/admin/type.routes')(router)
require('./routes/admin/event.routes')(router)
require('./routes/admin/postit.routes')(router)
require('./routes/admin/s3.routes')(router)

module.exports = router
