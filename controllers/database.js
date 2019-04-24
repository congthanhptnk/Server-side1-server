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
};

const updateLocation = (oldPath, newPath, newLoc, isSuccess) => {
  FileModel.updateOne({'original': oldPath}, {'location': newLoc, 'original': newPath}).then(writeOpResult => {
    console.log(writeOpResult);
    isSuccess(true)
  }).catch((err) => {
    console.log("error update: " + err)
    isSuccess(false)
  })
}

module.exports = { FileModel, findByLocation, deleteByLocation, deleteFile, updateLocation };