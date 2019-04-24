const fs = require('fs');
const path = require('path');
const deleteByLocation = require('../controllers/database').deleteByLocation;
const deleteFile = require('../controllers/database').deleteFile;

exports.checkFolder = (folder, existed) => {
  fs.stat(folder, (err) => {
    if(err && err.errno === -2){
      existed(false);
    } else {
      existed(true);
    }
  })
};

//Delete folder and its content synchronously
exports.deleteFolder = (folder, error) => {
  if(fs.existsSync(folder)) {
    fs.readdirSync(folder).forEach((item) => {
      var itemPath = path.join(folder, item);

      if(fs.lstatSync(itemPath).isDirectory()) {
        this.deleteFolder(itemPath);
      } else {
        fs.unlinkSync(itemPath);
      }
    });

    if(folder !== './public'){
      fs.rmdirSync(folder);

      deleteByLocation(folder);
      deleteFile(folder);
    }
  } else {
    error("Folder does not exist")
  }
};

exports.deleteFile = (filePath) => {
  fs.unlinkSync(filePath);
};