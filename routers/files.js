const express = require('express');
const router = express.Router();

const controller = require('../controllers/files');

const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended: true});

router.get('/', controller.getAll);
router.get('/:fileId', controller.getSingle);
router.delete('/', controller.deleteAll);
router.delete('/:fileId', controller.deleteSingle);
router.put('/:fileId', urlencodedParser, controller.updateDesc);

module.exports = router;