var express = require('express');
var router = express.Router();

var addController = require('../controllers/add');

router.get('/', addController.get);

router.post('/', addController.post);

module.exports = router;
