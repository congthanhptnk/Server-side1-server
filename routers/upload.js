const express = require('express');
const router = express.Router();

const uploadMulter = require('../helpers/uploadMulter');
const controller = require('../controllers/upload');

router.post('/', uploadMulter.single('image'), controller.uploadImage);

module.exports = router;