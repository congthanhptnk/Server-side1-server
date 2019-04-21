const FileModel = require('./database').FileModel;
const findByLocation = require('./database').findByLocation;
const fileSystem = require('../helpers/fileSystem');
const FileMover = require('../helpers/fileMover');

exports.getAll = (req, res) => {
  FileModel.find().then(all => {
    res.status(200).send(all);
  }).catch((err) => {
    res.status(401).send("failed to get all: " + err);
  })
};

exports.getSingle = (req, res) => {
  const fileId = req.params.fileId;

  FileModel.findById(fileId).then((file) => {
    res.status(200).send(file);
  }).catch((err) => {
    res.status(401).send("failed to findById: " + err);
  })
};

exports.deleteAll = (req, res) => {
  FileModel.deleteMany({}).then(() => {
    fileSystem.deleteFolder("./public");
    res.status(200).send("Delete all")
  }).catch((err) => {
    res.status(401).send("failed delete all: " + err);
  })
};

exports.deleteSingle = (req, res) => {
  const fileId = req.params.fileId;

  FileModel.findByIdAndDelete(fileId).then((file) => {
    fileSystem.deleteFile(file.original);
    res.sendStatus(200);
  }).catch((err) => {
    res.status(401).send("failed to delete single: " + err);
  });
};

exports.updateDesc = (req, res) => {
  console.log(req.body.location + "something not right");
  res.send(req.body.location);
};

exports.getByFolder = (req, res) => {
  const folder = req.body.location;

  findByLocation(folder, (result, err) => {
    if(!err) {
      res.status(200).send(result);
    } else {
      res.status(401).send("failed get by folder: " + err);
    }
  })
};

exports.copyFile = (req, res) => {
  const fileMover = new FileMover(req.body.location1, req.body.location2);
  const filename = req.body.filename;

  fileMover.copy(filename, (isSuccess, newFile) => {
    if(isSuccess) {
      res.status(200).send(newFile);
    } else {
      res.status(400).send("Failed to copy file");
    }
  })
};

exports.moveFile = (req, res) => {
  const fileMover = new FileMover(req.body.location1, req.body.location2);
  const filename = req.body.filename;

  fileMover.save(filename, (isSuccess, newPath) => {
    if(isSuccess){
      res.status(200).send(newPath);
    } else {
      res.status(400).send("Failed to move files")
    }
  })
}