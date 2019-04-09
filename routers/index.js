const express = require('express');
const router = express.Router();

router.use('/upload', require('./upload'));
router.use('/files', require('./files'));
router.use('/folders', require('./folders'));

module.exports = router;