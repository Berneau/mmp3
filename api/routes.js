var express = require('express')
var router = express.Router()
require('./routes/product.routes')(router)
require('./routes/vendor.routes')(router)

// middlewares
// router.use(function(req, res, next) {
//   console.log("I'm a Middleware")
//   next()
// })


router.get('/', function(req, res) {
  res.json({ message: 'UNICORN' })
})


module.exports = router
