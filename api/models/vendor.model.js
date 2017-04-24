var mongoose = require('mongoose')
var Schema = mongoose.Schema
var Product = require('./product.model')

var VendorSchema = new Schema({
  name: String,
  ownerName: String,
  email: String,
  tel: Number,
  description: String,
  category: Number,
  street: String,
  zip: Number,
  city: String,
  imageUrl: String,
  // products: [Product],
  lat: Number,
  long: Number,
  userId: String
})

module.exports = mongoose.model('Vendor', VendorSchema)
