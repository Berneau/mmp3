var mongoose = require('mongoose')
var Schema = mongoose.Schema

var CategorySchema = new Schema({
  name: String,
  imageUrl: String,
  typeId: String // TODO: foreign key
})

module.exports = mongoose.model('Category', CategorySchema)
