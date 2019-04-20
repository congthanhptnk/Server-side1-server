//const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const FileSystem = require('./fileSystem');

class FileMover {
  constructor(oldDir, newDir){
    this.oldDir = oldDir;
    this.newDir = newDir;
  }

  save(filename, result){
    //var oldPath = path.resolve(`${this.oldDir}/${filename}`);
    //var newpath = path.resolve(`${this.newDir}/${filename}`);
    var oldPath = path.join(this.oldDir, filename);
    var newPath = path.join(this.newDir, filename);

    FileSystem.checkFolder(this.newDir, (existed) => {
      if(existed){
        fs.rename(oldPath, newPath, (err) => {
          if(err) { console.log("repath error: ", err) }
          else {
            result(true, newPath);
          };
        })
      } else {
        result(false, oldPath);
      }
    })
  }
}

module.exports = FileMover;