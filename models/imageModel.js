const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = new Schema({
  name: String,
  lat: Number,
  lon: Number,
  description: String,
  thumbnail: String,
  original: String
});


module.exports = imageSchema;