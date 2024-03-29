var mongoose = require('mongoose')
var Schema = mongoose.Schema

var CategorySchema = new Schema({
  name: { type: String, required: true },
  typeUid: { type: String, required: true }, // for example id for vegetables
  imageUrl: String,
  imageKey: String
})

module.exports = mongoose.model('Category', CategorySchema)
