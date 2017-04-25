var mongoose = require('mongoose')
var Schema = mongoose.Schema

var ProductSchema = new Schema({
  uid: { type: Number, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  categoryId: { type: Number, required: true },
  imageUrl: String,
  availableAt: {
    fromPeriod: String,
    fromMonth: String,
    toPeriod: String,
    toMonth: String
  }
})

module.exports = mongoose.model('Product', ProductSchema)
