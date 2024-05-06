
var offersModel = require('../models/offers');

function addNewOffer(id, name, value) {
    offersModel.addNewOffer(id, name, value);
}

function getOffersByAuctionId(auctionId, budget) {
    return offersModel.getOffersByAuctionId(auctionId, budget);
}

module.exports = {
    addNewOffer,
    getOffersByAuctionId
};
