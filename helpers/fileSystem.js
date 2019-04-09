const fs = require('fs');

exports.checkFolder = (folder, existed) => {
  fs.stat(folder, (err) => {
    if(err && err.errno === -2){
      existed(false);
    } else {
      existed(true);
    }
  })
};