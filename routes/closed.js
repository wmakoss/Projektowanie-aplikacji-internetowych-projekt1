var express = require('express');
var router = express.Router();

var auctionsService = require('../services/auction');

router.get('/', function(req, res, next) {
    var closedAuctions = auctionsService.getClosedAuctions();
    res.render('closed', {closedAuctions: closedAuctions});
});

module.exports = router;
