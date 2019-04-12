const FileMover = require('../helpers/fileMover');
const FileModel = require('./database').FileModel;

exports.uploadFile = (req, res) => {
  if(req.file){
    const fileMover = new FileMover('public', req.body.location);

    fileMover.save(req.file.filename, (result) => {

      if(result){
        FileModel.create({
          name: req.body.name,
          time: req.body.time,
          type: req.body.type,
          location: req.body.location,
          original: req.file.path
        }).then((result) => {
          res.status(200).send("Success: " + result);
        }).catch((err) => {
          res.status(401).send("Folder already existed: " + err);
        });
      }
    });
  } else {
    res.status(401).send("Failed upload: File empty");
  }
};