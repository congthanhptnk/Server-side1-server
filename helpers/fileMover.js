//const sharp = require('sharp');
const fs = require('fs');
const FileSystem = require('./fileSystem');

class FileMover {
  constructor(oldDir, newDir){
    this.oldDir = oldDir;
    this.newDir = newDir;
  }

  save(filename, result){
    var newPath = `${this.newDir}/${filename}`;
    var oldPath = `${this.oldDir}/${filename}`;

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

  copy(filename, result){
    if(this.newDir === this.oldDir){
      var path1 = `${this.oldDir}/${filename}`;
      var path2 = `${this.newDir}/copy_${filename}`;
    } else {
      var path1 = `${this.oldDir}/${filename}`;
      var path2 = `${this.newDir}/${filename}`;
    }

    FileSystem.checkFolder(this.newDir, (existed) => {
      if(existed){
        fs.copyFile(path1, path2, (err) => {
          if(err) { console.log("copy error: " + err) }
          else {
            result(true, path2);
          };
        })
      } else {
        result(false, path1)
      }
    })
  }
}

module.exports = FileMover;