var mongoose = require('mongoose')
var Schema = mongoose.Schema

var TypeSchema = new Schema({
  uid: { type: Number, required: true },
  name: { type: String, required: true }
})

module.exports = mongoose.model('Type', TypeSchema)
