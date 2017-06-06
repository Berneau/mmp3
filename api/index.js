var express = require('express')
var bodyParser = require('body-parser')
var expressSanitzer = require('express-sanitizer')
var helmet = require('helmet')
var cors = require('cors')

var app = express()

// set environment settings
var database
if (process.env.NODE_ENV === 'DEVELOPMENT') database = require('./config.dev').database
else if (process.env.NODE_ENV === 'PRODUCTION') database = require('./config').database
else console.log('NODE_ENV not set.')

// set port
var port = process.env.PORT || 3000

// set up mongodb
var mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect(database)

// for debug
// mongoose.set('debug', true)

// helmet protection
app.use(helmet())

// Cross-Origin Resource sharing
app.use(cors())

// jsonify requests
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// escape params and user input
app.use(expressSanitzer())

// get routes from routes.js
var router = require('./routes')

// prefix all routes with /api
app.use('/api', router)

app.listen(port)
console.log(' ---------------------------------------')
console.log(' | Lungau API is running on port ' + port + '  |')
console.log(' ---------------------------------------')
module.exports = app
