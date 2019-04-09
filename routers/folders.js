const express = require('express');
const router = express.Router();

const controller = require('../controllers/folders');

const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended: true});

router.post('/create', urlencodedParser, controller.createFolder);
//router.delete('/', controller.deleteFolder);
//router.put('/rename', controller.renameFolder);

module.exports = router;