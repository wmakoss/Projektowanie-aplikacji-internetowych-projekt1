var express = require('express');
var router = express.Router();

var auctionsService = require('../services/auction');

router.get('/', function(req, res, next) {
    var openAuctions = auctionsService.getOpenAuctions();
    res.render('open', {openAuctions: openAuctions});
});

module.exports = router;
