var mongoose = require('mongoose')
var Schema = mongoose.Schema

var UserSchema = new Schema({
  email: { type: String, unique: true },
  password: String,
  isAdmin: Boolean
})

module.exports = mongoose.model('User', UserSchema)
