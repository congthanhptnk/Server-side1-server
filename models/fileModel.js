const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fileSchema = new Schema({
  name: String,
  time: Number,
  description: String,
  thumbnail: String,
  original: String
});

module.exports = fileSchema;