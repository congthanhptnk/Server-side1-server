const fileSchema = require('../models/fileModel');
const mongoose = require('mongoose');
const FileModel = mongoose.model('FileModel', fileSchema);

const findByLocation = (location, callback, error) => {
  FileModel.find({ 'location': location }).then(all => {
    callback(all)
  }).catch((err) => {
    console.log("FindByLocation: " + err);
    error(err);
  })
};

const deleteByLocation = (location) => {
  FileModel.deleteMany({ 'location': { "$regex": location, "$options": "i" }}).catch((err) => {
    console.log("error" + err);
  })
};

const deleteFile = (original) => {
  FileModel.deleteMany({ 'original': original}).catch((err) => {
    console.log("error" + err);
  })
}

module.exports = { FileModel, findByLocation, deleteByLocation, deleteFile };