
var auctionsModel = require('../models/auctions');
var offersService = require('../services/offers');

function getCurrentDateTime() {
    var now = new Date();
    var year = now.getFullYear();
    var month = String(now.getMonth() + 1).padStart(2, '0');
    var day = String(now.getDate()).padStart(2, '0');
    var hours = String(now.getHours()).padStart(2, '0');
    var minutes = String(now.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
}

function addNewAuction(name, institutionName, description, start, end, budget) {

    auctionsModel.addNewAuction(name, institutionName, description, start, end, budget);

}

function getOpenAuctions() {
    var now = getCurrentDateTime();
    return auctionsModel.getOpenAuctions(now);
}

function getClosedAuctions() {
    var now = getCurrentDateTime();
    return auctionsModel.getClosedAuctions(now);
}

function getAuctionById(id) {
    var auction;
    var rows = auctionsModel.getAuctionById(id);
    if (rows.length == 1) {
        auction = rows[0];
    } else {
        auction = null;
    }
    return auction;
}

function getAuctionStatus(auction) {

    if (auction == null) {
        return null;
    }

    var now = getCurrentDateTime();

    if (auction.start <= now && auction.end > now) {
        return "open";
    } else if (auction.start <= now && auction.end <= now) {
        return "closed";
    } else {
        return null;
    }
}

function getAuctionByIdWithStatusAndOffers(id) {

    var auction = getAuctionById(id);

    var status = getAuctionStatus(auction);

    var offers;

    if (auction == null) {
        offers = null;
    } else {
        offers = offersService.getOffersByAuctionId(id, auction.budget);
    }

    return {status: status, auction: auction, offers: offers};

}

module.exports = {
    addNewAuction,
    getOpenAuctions,
    getClosedAuctions,
    getAuctionById,
    getAuctionByIdWithStatusAndOffers
};
