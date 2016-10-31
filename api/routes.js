var express = require('express')
var jwt = require('jsonwebtoken')
var secret = require('./config').secret
var router = express.Router()

require('./routes/auth.routes')(router)

// authentication middleware
router.use(function(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token']

  if (token) {
    // verifies secret and checks expiration
    jwt.verify(token, secret, function(err, decoded) {
      if (err) return res.status(403).json({ message: 'Authentication failed.' })
      else next()
    })

  } else return res.status(412).json({ message: 'No token provided.' })
})

require('./routes/product.routes')(router)
require('./routes/vendor.routes')(router)
require('./routes/user.routes')(router)


module.exports = router
