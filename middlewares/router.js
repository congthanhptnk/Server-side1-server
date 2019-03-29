const express = require('express');
const router = express.Router();
const uploadMulter = require('../helpers/uploadMulter.js');

const resize = require('../helpers/resize');

const imageSchema = require('../models/imageModel');
const mongoose = require('mongoose');
const Image = mongoose.model('Image', imageSchema);

router.post('/upload', uploadMulter.single('image'), function (req, res){
  if(req.file){
    const resizedImg = new resize('public');
    resizedImg.save(req.file.path, req.file.filename, callback);

    Image.create({
      name: req.file.name,
      lat: req.file.lat,
      lon: req.file.lon,
      description: req.file.description,
      thumbnail: req.file.thumbnail,
      original: req.file.original
    }).then(file => {
      res.send(`success upload: ${file.description}`);
    });

  } else {
    res.status(401).json({error: 'Not found image'})
    res.send("FAILED UPLOAD")
  }
});

router.get('/all', function(req, res){
  Image.find().then(all => {
    res.send(all);
  });
});

const callback = (filename) => {
  console.log(filename)
};

module.exports = router;