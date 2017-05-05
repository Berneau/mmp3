var mongoose = require('mongoose')
var Schema = mongoose.Schema

var UserSchema = new Schema({
  email: { type: String, unique: true },
  password: { type: String, required: true },
  salt: { type: String, require: true },
  isAdmin: { type: Boolean, required: true }
})

module.exports = mongoose.model('User', UserSchema)
