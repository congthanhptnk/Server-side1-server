const sharp = require('sharp');
const path = require('path');

class Resize {
  constructor(dir){
    this.dir = dir;
  }

  save(input, filename, callback){
    const newName = Resize.rename(filename);

    sharp(input).resize(300, 300, {
      fit: sharp.fit.inside,
      withoutEnlargement: true
    })
        .toFile(this.filepath(newName.small))
        .then(() => {
      callback(this.filepath(newName.original), this.filepath(newName.small));
    })
        .catch((error) => {
      console.log(`Resize error: ${error}`);
    });

  }

  static rename(filename){
    var newName = { small: `s_${filename}`, medium: `m_${filename}`, original: filename};

    return newName;
  }

  filepath(filename){
    return path.resolve(`${this.dir}/${filename}`)
  }
}

module.exports = Resize;