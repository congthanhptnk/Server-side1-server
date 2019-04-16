const FileModel = require('./database').FileModel;
const fileSystem = require('../helpers/fileSystem');

exports.getAll = (req, res) => {
  FileModel.find().then(all => {
    res.send(all);
  }).catch((err) => {
    res.status(401).send("failed to get all: " + err);
  })
};

exports.getSingle = (req, res) => {
  const fileId = req.params.fileId;

  FileModel.findById(fileId).then((file) => {
    console.log(file);
    res.send(file);
  }).catch((err) => {
    res.status(401).send("failed to findById: " + err);
  })
};

exports.deleteAll = (req, res) => {
  FileModel.deleteMany({}).then(() => {
    fileSystem.deleteFolder("./public");
    res.send("Delete all")
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
  console.log(req.body.location + "YEEEETE");
  const folder = req.body.location;
  FileModel.find({ 'location': folder }).then(all => {
    res.send(all);
  }).catch((err) => {
    res.status(401).send("failed get by folder: " + err);
  })
};