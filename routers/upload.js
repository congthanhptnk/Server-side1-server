const express = require('express');
const router = express.Router();

const uploadMulter = require('../helpers/uploadMulter');
const controller = require('../controllers/upload');

router.post('/', uploadMulter.single('file'), controller.uploadFile);

module.exports = router;