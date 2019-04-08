const resize = require('../helpers/resize');
const Image = require('./database').Image;

exports.uploadImage = (req, res) => {
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
};