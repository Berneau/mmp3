var mongoose = require('mongoose')
var Schema = mongoose.Schema
var Product = require('./product.model')

var VendorSchema = new Schema({
  name: { type: String, required: true },
  userUid: { type: String, required: true },
  email: { type: String, required: true },
  description: String,
  imageUrl: String,
  subName: String,
  website: String,
  tel: Number,
  address: {
    city: String,
    zip: Number,
    street: String,
    lat: Number,
    long: Number
  }
})

module.exports = mongoose.model('Vendor', VendorSchema)
