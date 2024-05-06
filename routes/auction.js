var express = require('express');
var router = express.Router();

var auctionsService = require('../services/auction');
var offersService = require('../services/offers');

router.get('/:id', function(req, res, next) {
    var auctionWithStatusAndOffers = auctionsService.getAuctionByIdWithStatusAndOffers(req.params.id);
    if (auctionWithStatusAndOffers.status == "open") {
        res.render('auctionOpen', {auction: auctionWithStatusAndOffers.auction, message: ""});
    } else if (auctionWithStatusAndOffers.status == "closed") {
        res.render('auctionClosed', {auction: auctionWithStatusAndOffers.auction, offers: auctionWithStatusAndOffers.offers});
    } else {
        res.render("error", {error: {status: 404, stack: ""}, message: "Auction id not found"});
    }
});

router.post('/:id', function(req, res, next) {
    
    // TODO: input validation and status of auction must be set to open
    offersService.addNewOffer(req.params.id, req.body.name, req.body.value);
    
    var auctionWithStatusAndOffers = auctionsService.getAuctionByIdWithStatusAndOffers(req.params.id);
    if (auctionWithStatusAndOffers.status == "open") {
        res.render('auctionOpen', {auction: auctionWithStatusAndOffers.auction, message: "Nowa oferta została dodana!"});
    } else if (auctionWithStatusAndOffers.status == "closed") {
        res.render('auctionClosed', {auction: auctionWithStatusAndOffers.auction, offers: auctionWithStatusAndOffers.offers});
    } else {
        res.render("error", {error: {status: 404, stack: ""}, message: "Auction id not found"});
    }
});

module.exports = router;
