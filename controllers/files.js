const FileModel = require('./database').FileModel;

exports.getAll = (req, res) => {
  FileModel.find().then(all => {
    res.send(all);
  }).catch((err) => {
    res.status(401);
    res.send("failed to get all: ", err);
  })
};

exports.getSingle = (req, res) => {
  const fileId = req.params.fileId;

  FileModel.findById({'_id': fileId}).then((file) => {
    console.log(file);
    res.send(file);
  }).catch((err) => {
    res.status(401);
    res.send("failed to findById: ", err);
  })
};

exports.deleteAll = (req, res) => {
  FileModel.deleteMany({}).then(() => {
    res.send("Delete all")
  }).catch((err) => {
    res.status(401);
    res.send("failed delete all: ", err);
  })
};

exports.deleteSingle = (req, res) => {
  const fileId = req.params.fileId;

  FileModel.deleteOne({'_fileId': fileId}).then(() => {
    res.send("DELETE SINGLE")
  }).catch(err => {
    res.status(401);
    res.send("failed delete single: ", err);
  })
};

exports.updateDesc = (req, res) => {
  res.send(req.body.updateField);
  console.log(req.body);
};

exports.getByFolder = (req, res) => {
  console.log("YEEEETE");
  const folder = req.body.location;

  FileModel.find({ 'location': folder }).then(all => {
    res.send(all);
  }).catch((err) => {
    res.status(401);
    res.send("failed get by folder: ", err);
  })
};