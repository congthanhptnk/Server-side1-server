const multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const uploadMulter = multer({
  storage: storage,
  limits: { fieldSize: 50 * 1024 * 1024,
            fileSize: 50 * 1024 * 1024 }
});


module.exports = uploadMulter;