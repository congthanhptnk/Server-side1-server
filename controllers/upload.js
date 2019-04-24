const FileMover = require('../helpers/fileMover');
const FileModel = require('./database').FileModel;

exports.uploadFile = (req, res) => {
  if(req.file){
    const fileMover = new FileMover('public', req.body.location);
    //console.log(req.file.filename);

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


//For non-iOS use
const getFileType = (filename) => {
  const splitString = filename.split(".");
  let fileType = "folder";
  if(splitString.length !== 0){
    fileType = splitString[splitString.length - 1]
  }
  return fileType
}