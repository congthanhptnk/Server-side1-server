const fileSchema = require('../models/fileModel');
const mongoose = require('mongoose');
const FileModel = mongoose.model('FileModel', fileSchema);

module.exports = { FileModel };