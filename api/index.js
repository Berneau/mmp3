var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var helmet = require('helmet')

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

// get routes from routes.js
var router = require('./routes')

app.use(helmet())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


// prefix all routes with /api
app.use('/api', router)


app.listen(port)
console.log(' ---------------------------------------')
console.log(' | Lungau API is running on port ' + port + '  |')
console.log(' ---------------------------------------')
module.exports = app
