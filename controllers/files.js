const FileModel = require('./database').FileModel;
const findByLocation = require('./database').findByLocation;
const updateLocation = require('./database').updateLocation;
const fileSystem = require('../helpers/fileSystem');
const uHelper = require('../helpers/utilityHelper');
const FileMover = require('../helpers/fileMover');

exports.getAll = (req, res) => {
  FileModel.find().then(all => {
    res.status(200).send(all);
  }).catch((err) => {
    res.status(500).send("Failed to get all: " + err);
  })
};

exports.getSingle = (req, res) => {
  const fileId = req.params.fileId;

  FileModel.findById(fileId).then((file) => {
    res.status(200).send(file);
  }).catch((err) => {
    res.status(400).send("Failed to findById: " + err);
  })
};

exports.deleteAll = (req, res) => {
  FileModel.deleteMany({}).then(() => {
    fileSystem.deleteFolder("./public");
    res.status(200).send("Delete all")
  }).catch((err) => {
    res.status(400).send("Failed delete all: " + err);
  })
};

exports.deleteSingle = (req, res) => {
  const fileId = req.params.fileId;

  if(fileId !== null){
    FileModel.findByIdAndDelete(fileId).then((file) => {
      fileSystem.deleteFile(file.original);
      res.status(200).send("deleted");
    }).catch((err) => {
      res.status(400).send("Failed to delete single: " + err);
    });
  } else {
    res.status(400).send("Empty fileID")
  }
};

exports.getByFolder = (req, res) => {
  const folder = req.body.location;

  if(folder !== null){
    findByLocation(folder, (result, err) => {
      if(!err) {
        res.status(200).send(result);
      } else {
        res.status(400).send("Failed to get by folder: " + err);
      }
    })
  } else {
    res.status(400).send("Empty location")
  }

};

exports.copyFile = (req, res) => {
  let filename = uHelper.getFileName(req.body.original);
  const fileMover = new FileMover(req.body.oldLoc, req.body.newLoc);

  fileMover.copy(filename, (isSuccess, newFile) => {
    if(isSuccess) {
      res.status(200).send(newFile);
    } else {
      res.status(400).send("Failed to copy file");
    }
  })
};

exports.moveFile = (req, res) => {
  let filename = uHelper.getFileName(req.body.original);
  const fileMover = new FileMover(req.body.oldLoc, req.body.newLoc);

  fileMover.save(filename, (isSuccess, newPath) => {
    if(isSuccess){
      updateLocation(req.body.original, newPath, req.body.newLoc, (isSuccess) => {
        if(isSuccess){
          res.status(200).send(newPath);
        } else {
          res.status(400).send("Failed to change database entry")
        }
      });
    } else {
      res.status(400).send("File already existed or unable to repath file")
    }
  })
};
