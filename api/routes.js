var express = require('express')
var router = express.Router()

require('./routes/auth.routes')(router)

// auth middleware
// router.use(function(req, res, next) {
//   console.log("I'm a Middleware")
//   next()
// })

require('./routes/product.routes')(router)
require('./routes/vendor.routes')(router)
require('./routes/user.routes')(router)


module.exports = router
