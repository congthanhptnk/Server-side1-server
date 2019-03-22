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
      callback(newName.small);
    })
        .catch((error) => {
      console.log(`Resize error: ${error}`);
    });

  }

  static rename(filename){
    //const filename = uuidv4();
    var newName = { small: `${filename}_s.png`, medium: `${filename}_m.png`, original: `${filename}.png`};

    return newName;
  }

  filepath(filename){
    return path.resolve(`${this.dir}/${filename}`)
  }
}

module.exports = Resize;