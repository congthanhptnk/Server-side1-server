const fileSystem = require('../helpers/fileSystem');
const fs = require('fs');

exports.createFolder = (req, res) => {
  const folder = req.body.folderPath;

  fileSystem.checkFolder(folder, (existed) => {
    if(existed){
      res.send("Folder already existed");
    } else {
      fs.mkdir(folder, () => {
        res.send("Folder created");
      })
    }
  })
};


