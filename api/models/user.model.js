var mongoose = require('mongoose')
var Schema = mongoose.Schema

var UserSchema = new Schema({
  uid: { type: Number, required: true },
  email: { type: String, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true }
})

module.exports = mongoose.model('User', UserSchema)
