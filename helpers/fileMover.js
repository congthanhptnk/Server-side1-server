//const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const FileSystem = require('./fileSystem');

class FileMover {
  constructor(oldDir, newDir){
    this.oldDir = oldDir;
    this.newDir = newDir;
  }

  save(filename, isSuccess){
    var oldPath = path.resolve(`${this.oldDir}/${filename}`);
    var newpath = path.resolve(`${this.newDir}/${filename}`);

    FileSystem.checkFolder(this.newDir, (existed) => {
      if(existed){
        fs.rename(oldPath, newpath, (err) => {
          if(err) { console.log("repath error: ", err) }
          else {
            console.log("repath complete");

            isSuccess(true);
          };
        })
      } else {
        isSuccess(false);
      }
    })
  }
}

module.exports = FileMover;