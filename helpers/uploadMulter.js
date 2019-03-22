const multer = require('multer');
const uploadMulter = multer({
  dest: 'public/',
  limits: { filesize: 1000000*90, fieldSize: 25 * 1024 * 1024 }});

module.exports = uploadMulter;