
var sqlite = require('better-sqlite3');

function getAllOffers() {
    var db = sqlite('database.sqlite3');

    var rows = db.prepare("SELECT * FROM offers;").all();

    db.close();

    return rows;
}

function addNewOffer(id, name, value) {
    var db = sqlite('database.sqlite3');

    db.prepare("INSERT INTO offers (auction_id, name, value) VALUES (?, ?, ?);").run([id, name, value]);

    db.close();
}

function getOffersByAuctionId(auctionId, budget) {
    var db = sqlite('database.sqlite3');

    var rows = db.prepare("SELECT * FROM offers WHERE auction_id = ? AND value <= ? ORDER BY value ASC;").all([auctionId, budget]);

    db.close();

    return rows;
}

module.exports = {
    getAllOffers,
    addNewOffer,
    getOffersByAuctionId
};
