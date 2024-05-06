var express = require('express');
var router = express.Router();

var openController = require('../controllers/open');

router.get('/', openController.get);

module.exports = router;
