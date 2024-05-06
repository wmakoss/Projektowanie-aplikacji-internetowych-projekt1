var express = require('express');
var router = express.Router();

var closedController = require('../controllers/closed');

router.get('/', closedController.get);

module.exports = router;
