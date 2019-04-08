const express = require('express');
const router = express.Router();

const controller = require('../controllers/images');

router.get('/', controller.getAll);
router.get('/:imageId', controller.getSingle);
router.delete('/', controller.deleteAll);
router.delete('/:imageId', controller.deleteSingle);

module.exports = router;