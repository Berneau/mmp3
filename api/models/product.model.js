var mongoose = require('mongoose')
var Schema = mongoose.Schema

var Vendor = require('./vendor.model')

var ProductSchema = new Schema({
  name: { type: String, required: true },
  categoryId: { type: String, required: true },
  vendor: { type: String, ref: 'Vendor' },
  availableAt: {
    fromPeriod: { type: String, required: true },
    fromMonth: { type: String, required: true },
    toPeriod: { type: String, required: true },
    toMonth: { type: String, required: true }
  },
  imageUrl: String,
  imageKey: String
})

module.exports = mongoose.model('Product', ProductSchema)
