const fs = require('fs');
const path = require('path');

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
exports.deleteFolder = (folder) => {
  if(fs.existsSync(folder)) {
    fs.readdirSync(folder).forEach((item) => {
      var itemPath = path.join(folder, item);

      if(fs.lstatSync(itemPath).isDirectory()) {
        this.deleteFolder(itemPath);
      } else {
        fs.unlinkSync(itemPath);
      }
    });

    fs.rmdirSync(folder);
  }
};