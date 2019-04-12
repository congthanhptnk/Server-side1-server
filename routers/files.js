const express = require('express');
const router = express.Router();

const controller = require('../controllers/files');

const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended: true});

router.get('/', controller.getAll);
router.get('/fileId/:fileId', controller.getSingle);
router.get('/folder', urlencodedParser, controller.getByFolder);
router.delete('/', controller.deleteAll);
router.delete('/:fileId', controller.deleteSingle);
router.patch('/:fileId', urlencodedParser, controller.updateDesc);

module.exports = router;