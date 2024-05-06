var express = require('express');
var router = express.Router();

var auctionsService = require('../services/auction');
var validationService = require('../services/validation');

router.get('/', function(req, res, next) {
    res.render('add', {message: ""});
});

router.post('/', function(req, res, next) {
    
    if (!validationService.isValidText(req.body.name)) {
        return res.render('add', {message: "Dane wejściowe są nieprawidłowe", messagetype: "errormessage"});
    }

    if (!validationService.isValidText(req.body.institutionName)) {
        return res.render('add', {message: "Dane wejściowe są nieprawidłowe", messagetype: "errormessage"});
    }

    if (!validationService.isValidText(req.body.description)) {
        return res.render('add', {message: "Dane wejściowe są nieprawidłowe", messagetype: "errormessage"});
    }

    if (!validationService.isValidDate(req.body.start)) {
        return res.render('add', {message: "Dane wejściowe są nieprawidłowe", messagetype: "errormessage"});
    }

    if (!validationService.isValidDate(req.body.end)) {
        return res.render('add', {message: "Dane wejściowe są nieprawidłowe", messagetype: "errormessage"});
    }

    if (!validationService.isValidNumber(req.body.budget)) {
        return res.render('add', {message: "Dane wejściowe są nieprawidłowe", messagetype: "errormessage"});
    }

    auctionsService.addNewAuction(req.body.name, req.body.institutionName, req.body.description, req.body.start, req.body.end, req.body.budget);
    res.render('add', {message: "Nowy przetarg został dodany!", messagetype: "successmessage"});
});

module.exports = router;
