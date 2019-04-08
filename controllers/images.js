const Image = require('./database').Image;

exports.getAll = (req, res) => {
  Image.find().then(all => {
    res.send(all);
  }).catch((err) => {
    res.status((401).json({error: err}));
    res.send("failed get all");
  })
};

exports.getSingle = (req, res) => {
  const imageId = req.params.imageId;

  Image.findById({'_imageId': imageId}).then((image) => {
    res.send(image);
  }).catch((err) => {
    res.status((401).json({error: err}));
    res.send("failed get single");
  })
};

exports.deleteAll = (req, res) => {
  Image.deleteMany({}).then(() => {
    res.send("Delete all")
  }).catch((err) => {
    res.status((401).json({error: err}));
    res.send("failed delete all");
  })
};

exports.deleteSingle = (req, res) => {
  const imageId = req.params.imageId;

  Image.deleteOne({'_imageId': imageId}).then(() => {
    res.send("DELETE SINGLE")
  }).catch(err => {
    res.status((401).json({error: err}));
    res.send("failed delete single");
  })
};