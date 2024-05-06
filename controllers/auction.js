
var auctionsService = require('../services/auction');
var offersService = require('../services/offers');
var validationService = require('../services/validation');

function get(req, res, next) {
    var auctionWithStatusAndOffers = auctionsService.getAuctionByIdWithStatusAndOffers(req.params.id);
    if (auctionWithStatusAndOffers.status == "open") {
        res.render('auctionOpen', {auction: auctionWithStatusAndOffers.auction, message: ""});
    } else if (auctionWithStatusAndOffers.status == "closed") {
        res.render('auctionClosed', {auction: auctionWithStatusAndOffers.auction, offers: auctionWithStatusAndOffers.offers});
    } else {
        res.render("error", {error: {status: 404, stack: ""}, message: "Auction id not found"});
    }
}

function post(req, res, next) {
    var auctionWithStatusAndOffers = auctionsService.getAuctionByIdWithStatusAndOffers(req.params.id);

    if (!validationService.isValidNumber(req.params.id)) {
        return res.status(400).render("error", {error: {status: 400, stack: ""}, message: "Input is invalid"});
    }

    if (!validationService.isValidText(req.body.name)) {
        return res.render('auctionOpen', {auction: auctionWithStatusAndOffers.auction, message: "Dane wejściowe są nieprawidłowe", messagetype: "errormessage"});
    }

    if (!validationService.isValidNumber(req.body.value)) {
        return res.render('auctionOpen', {auction: auctionWithStatusAndOffers.auction, message: "Dane wejściowe są nieprawidłowe", messagetype: "errormessage"});
    }
    
    if (auctionWithStatusAndOffers.status == "open") {
        offersService.addNewOffer(req.params.id, req.body.name, req.body.value);
        res.render('auctionOpen', {auction: auctionWithStatusAndOffers.auction, message: "Nowa oferta została dodana!", messagetype: "successmessage"});
    } else if (auctionWithStatusAndOffers.status == "closed") {
        res.render('auctionClosed', {auction: auctionWithStatusAndOffers.auction, offers: auctionWithStatusAndOffers.offers});
    } else {
        res.status(400).render("error", {error: {status: 404, stack: ""}, message: "Auction id not found"});
    }
}

module.exports = {
    get,
    post
};
