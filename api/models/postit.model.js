var mongoose = require('mongoose')
var Schema = mongoose.Schema

var PostitSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  imageUrl: String
})

module.exports = mongoose.model('Postit', PostitSchema)
