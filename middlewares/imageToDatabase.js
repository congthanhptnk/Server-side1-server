const mongoose = require('mongoose');
const imageSchema = require('../models/imageModel');

const imageToDatabase = (name, lat, lon, description, thumbnail, original) => {
  const Image = mongoose.model('Image', imageSchema);
  Image.create({
    name: name,
    lat: lat,
    lon: lon,
    description: description,
    thumbnail: thumbnail,
    original: original
  })
};

module.exports = imageToDatabase;