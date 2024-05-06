var express = require('express');
var router = express.Router();

var auctionController = require('../controllers/auction');

router.get('/:id', auctionController.get);

router.post('/:id', auctionController.post);

module.exports = router;
