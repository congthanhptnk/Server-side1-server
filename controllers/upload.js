const FileMover = require('../helpers/fileMover');
const FileModel = require('./database').FileModel;

exports.uploadFile = (req, res) => {
  if(req.file){
    console.log("something is wrong");
    const fileMover = new FileMover('public', req.body.location);

    fileMover.save(req.file.filename, (isSuccess, curPath) => {
      if(isSuccess){
        FileModel.create({
          name: req.body.name,
          time: req.body.time,
          type: req.body.type,
          location: req.body.location,
          original: curPath
        }).then((result) => {
          res.status(200).send(result);
        }).catch((err) => {
          res.status(401).send("Failed to create: " + err);
        });

      } else {
        res.status(401).send("Folder does not exist");
      }

    });
  } else {
    res.status(401).send("Failed upload: File empty");
  }
};