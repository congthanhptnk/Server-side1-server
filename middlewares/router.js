const express = require('express');
//const ObjectId = require('mongodb').ObjectId;
const router = express.Router();
const uploadMulter = require('../helpers/uploadMulter.js');

const resize = require('../helpers/resize');

const imageSchema = require('../models/imageModel');
const mongoose = require('mongoose');
const Image = mongoose.model('Image', imageSchema);

router.post('/upload', uploadMulter.single('image'), function (req, res){
  if(req.file){
    const resizedImg = new resize('public');

    resizedImg.save(req.file.path, req.file.filename, (originalPath, smallPath) =>{
      Image.create({
        name: req.body.name,
        lat: req.body.lat,
        lon: req.body.lon,
        description: req.body.description,
        thumbnail: smallPath,
        original: originalPath
      });
    });

    res.send("success upload")

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

router.delete('/delete/:id', function(req, res){
  const id = req.params.id;

  Image.deleteOne({'_id': id}).then(() => {
    res.send("DELETE EVERYTHING")
  }).catch(err => {
    res.status((401).json({error: err}));
    res.send("failed delete");
  })
});

router.put('/update/name/:id', function(req, res){
  const id = req.params.id;
  const name = req.query.name;

  Image.findOneAndUpdate({'_id': id}, {'name': name}).then(() => {
    res.send("Success update");
  }).catch(err => {
    res.status((401).json({error: err}));
    res.send("failed update");
  })
})

module.exports = router;