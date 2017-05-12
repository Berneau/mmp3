var mongoose = require('mongoose')
var Schema = mongoose.Schema

var EventSchema = new Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  description: String,
  location: {
    name: String,
    lat: Number,
    long: Number
  }
})

module.exports = mongoose.model('Event', EventSchema)
