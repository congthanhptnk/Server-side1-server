const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fileSchema = new Schema({
  name: String,
  time: Number,
  type: String,
  location: String,
  original: String
});

module.exports = fileSchema;