const express = require('express');
const router = express.Router();
const uploadMulter = require('../helpers/uploadMulter.js');
const resize = require('../helpers/resize');
const imgToDB = require('./imageToDatabase');

router.post('/upload', uploadMulter.single('image'), function (req, res){
 // console.log(req.body)
  if(req.file){
    //console.log(req.file);
    console.log(req.body.name);
    //console.log(req);

    const resizedImg = new resize('public');
    resizedImg.save(req.file.path, req.file.filename, callback);

    imgToDB(req.body.name,
        req.body.lat,
        req.body.lon,
        req.body.description,
        req.body.thumbnail,
        req.body.original);

    res.send("success");
  } else {
    res.status(401).json({error: 'Not found image'})
    res.send("FAILED UPLOAD")
  }
});

const callback = (filename) => {
  console.log(filename)
};

module.exports = router;