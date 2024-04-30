var express = require('express');
var router = express.Router();

var auctionsService = require('../services/auction');

router.get('/:id', function(req, res, next) {
    var auctionWithStatusAndOffers = auctionsService.getAuctionByIdWithStatusAndOffers(req.params.id);
    if (auctionWithStatusAndOffers.status == "open") {
        res.render('auctionOpen', {auction: auctionWithStatusAndOffers.auction});
    } else if (auctionWithStatusAndOffers.status == "closed") {
        res.render('auctionClosed', {auction: auctionWithStatusAndOffers.auction, offers: auctionWithStatusAndOffers.offers});
    } else {
        res.render("error", {error: {status: 404, stack: ""}, message: "Auction id not found"});
    }
});

router.post('/:id', function(req, res, next) {
    
    // TODO: input validation and status of auction must be set to open
    auctionsService.addNewOffer(req.params.id, req.body.name, req.body.value);
    
    //TODO: add message (new offer created)
    var auctionWithStatusAndOffers = auctionsService.getAuctionByIdWithStatusAndOffers(req.params.id);
    if (auctionWithStatusAndOffers.status == "open") {
        res.render('auctionOpen', {auction: auctionWithStatusAndOffers.auction});
    } else if (auctionWithStatusAndOffers.status == "closed") {
        res.render('auctionClosed', {auction: auctionWithStatusAndOffers.auction, offers: auctionWithStatusAndOffers.offers});
    } else {
        res.render("error", {error: {status: 404, stack: ""}, message: "Auction id not found"});
    }
});

module.exports = router;
