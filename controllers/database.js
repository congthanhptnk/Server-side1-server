const imageSchema = require('../models/image');
const mongoose = require('mongoose');
const Image = mongoose.model('Image', imageSchema);

module.exports = { Image };