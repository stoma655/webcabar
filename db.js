// db.js
const mongoose = require('mongoose');
const uri = 'mongodb://127.0.0.1:27017/webcabar';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));