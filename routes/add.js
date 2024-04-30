var express = require('express');
var router = express.Router();

var auctionsService = require('../services/auction');

router.get('/', function(req, res, next) {
    res.render('add');
});

router.post('/', function(req, res, next) {
    // TODO: input validation
    auctionsService.addNewAuction(req.body.name, req.body.institutionName, req.body.description, req.body.start, req.body.end, req.body.budget);
    res.render('add');//TODO: add message (new auction created) with link to new auction
});

module.exports = router;
