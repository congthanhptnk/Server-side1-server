const FileModel = require('./database').FileModel;

exports.getAll = (req, res) => {
  FileModel.find().then(all => {
    res.send(all);
  }).catch((err) => {
    res.status((401).json({error: err}));
    res.send("failed get all");
  })
};

exports.getSingle = (req, res) => {
  const fileId = req.params.fileId;

  FileModel.findById({'_fileId': fileId}).then((file) => {
    res.send(file);
  }).catch((err) => {
    res.status((401).json({error: err}));
    res.send("failed get single");
  })
};

exports.deleteAll = (req, res) => {
  FileModel.deleteMany({}).then(() => {
    res.send("Delete all")
  }).catch((err) => {
    res.status((401).json({error: err}));
    res.send("failed delete all");
  })
};

exports.deleteSingle = (req, res) => {
  const fileId = req.params.fileId;

  FileModel.deleteOne({'_fileId': fileId}).then(() => {
    res.send("DELETE SINGLE")
  }).catch(err => {
    res.status((401).json({error: err}));
    res.send("failed delete single");
  })
};

exports.updateDesc = (req, res) => {
  res.send(req.body.updateField);
  console.log(req.body);
};