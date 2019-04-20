const fileSystem = require('../helpers/fileSystem');
const fs = require('fs');
const FileModel = require('./database').FileModel;

exports.createFolder = (req, res) => {
  const location = req.body.location;
  const name = req.body.name;
  const folder = `${location}/${name}`;

  fileSystem.checkFolder(folder, (existed) => {
    if(existed){
      res.send("Folder already existed");
    } else {
      fs.mkdir(folder, (err) => {
        if(err){
          res.sendStatus(401);
        } else {
          FileModel.create({
            name: name,
            time: req.body.time,
            type: req.body.type,
            location: location,
            original: folder
          });

          res.send("Folder created");
        }
      })
    }
  })
};

exports.deleteFolder = (req, res) => {
  const folder = req.body.location;

  fileSystem.deleteFolder(folder);

  res.send("Folder deleted");
};


