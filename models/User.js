// models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  login: String,
  email: String,
  password: String,
});

module.exports = mongoose.model('User', UserSchema);