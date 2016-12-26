var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var database = require('./config').database
var helmet = require('helmet')

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
