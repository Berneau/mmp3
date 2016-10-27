var mongoose = require('mongoose')
var Schema = mongoose.Schema

var ProductSchema = new Schema({
  name: String,
  description: String,
  season: String,
  imageUrl: String,
  category: Number
})

module.exports = mongoose.model('Product', ProductSchema)
