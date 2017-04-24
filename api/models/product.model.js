var mongoose = require('mongoose')
var Schema = mongoose.Schema

var ProductSchema = new Schema({
  name: String,
  description: String, // TODO: find better term
  imageUrl: String,
  categoryId: String,
  availableAt: String // TODO: "von <Anfang> <März> bis <Ende> <Mai>" -> Object { from: to: }
})

module.exports = mongoose.model('Product', ProductSchema)
