var mongoose = require('mongoose')
var Schema = mongoose.Schema

var EventSchema = new Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  description: String
})

module.exports = mongoose.model('Event', EventSchema)
