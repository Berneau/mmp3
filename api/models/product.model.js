var mongoose = require('mongoose')
var Schema = mongoose.Schema

var ProductSchema = new Schema({
  name: String
  // description: String,
  // imageUrl: String,
  // category: String
})

module.exports = mongoose.model('Product', ProductSchema)
