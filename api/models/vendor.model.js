var mongoose = require('mongoose')
var Schema = mongoose.Schema
var Product = require('./product.model')

var VendorSchema = new Schema({
  name: { type: String, required: true },
  ownerName: { type: String, required: true },
  email: { type: String, required: true },
  category: { type: Number, required: true },
  userUid: { type: String, required: true },
  tel: Number,
  description: String,
  imageUrl: String,
  address: {
    city: String,
    zip: Number,
    street: String,
    lat: Number,
    long: Number
  }
})

module.exports = mongoose.model('Vendor', VendorSchema)
