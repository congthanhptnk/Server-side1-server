const express = require('express');
const router = express.Router();

const controller = require('../controllers/files');

const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended: true});

router.get('/', controller.getAll);
router.get('/fileId/:fileId', controller.getSingle);

router.post('/folder', urlencodedParser, controller.getByFolder);
router.post('/copy', urlencodedParser, controller.copyFile);
router.post('/move', urlencodedParser, controller.moveFile);

router.delete('/', controller.deleteAll);
router.delete('/:fileId', controller.deleteSingle);

module.exports = router;