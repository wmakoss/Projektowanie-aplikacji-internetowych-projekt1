var express = require('express');
var router = express.Router();

var indexController = require('../controllers/index');

router.get('/', indexController.get);

module.exports = router;
