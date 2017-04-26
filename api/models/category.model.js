var mongoose = require('mongoose')
var Schema = mongoose.Schema

var CategorySchema = new Schema({
  name: { type: String, required: true },
  typeUid: { type: Number, required: true } // for example id for vegetables
  imageUrl: String,
})

module.exports = mongoose.model('Category', CategorySchema)
