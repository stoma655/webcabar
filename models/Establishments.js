// models/Establishments.js
const mongoose = require('mongoose');

const EstablishmentsSchema = new mongoose.Schema({
    login: String,
    email: String,
    password: String,
  });
  
  module.exports = mongoose.model('Establishments', EstablishmentsSchema);