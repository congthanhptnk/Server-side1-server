const express = require('express');
const router = express.Router();

const controller = require('../controllers/folders');

const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended: true});

router.post('/', urlencodedParser, controller.createFolder);
router.delete('/', urlencodedParser, controller.deleteFolder);

module.exports = router;