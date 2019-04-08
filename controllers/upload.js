const resize = require('../helpers/resize');
const FileModel = require('./database').FileModel;

exports.uploadFile = (req, res) => {
  console.log(req.body);
  if(req.file){
    const resizedImg = new resize('public');

    resizedImg.save(req.file.path, req.file.filename, (originalPath, smallPath) =>{
      FileModel.create({
        name: req.body.name,
        time: req.body.time,
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