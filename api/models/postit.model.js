var mongoose = require('mongoose')
var Schema = mongoose.Schema

var PostitSchema = new Schema({
  name: { type: String, required: true },
  confirmed: { type: Boolean, required: true },
  description: String,
  location: String,
  vendorId: String,
  imageUrl: String,
  imageKey: String
})

module.exports = mongoose.model('Postit', PostitSchema)
