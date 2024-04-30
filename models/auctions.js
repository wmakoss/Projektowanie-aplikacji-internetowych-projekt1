
var sqlite = require('better-sqlite3');

function addNewAuction(name, institutionName, description, start, end, budget) {
    var db = sqlite('database.sqlite3');

    db.prepare("INSERT INTO auctions (name, institutionName, description, start, end, budget) VALUES (?, ?, ?, ?, ?, ?);").run([name, institutionName, description, start, end, budget]);

    db.close();
}

function getOpenAuctions(now) {
    var db = sqlite('database.sqlite3');

    var rows = db.prepare("SELECT * FROM auctions WHERE start <= ? AND end > ?;").all([now, now]);

    db.close();

    return rows;
}

function getClosedAuctions(now) {
    var db = sqlite('database.sqlite3');

    var rows = db.prepare("SELECT * FROM auctions WHERE start <= ? AND end <= ?;").all([now, now]);

    db.close();

    return rows;
}

function getAuctionById(id) {
    var db = sqlite('database.sqlite3');

    var rows = db.prepare("SELECT * FROM auctions WHERE id = ?;").all([id]);

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
    addNewAuction,
    getOpenAuctions,
    getClosedAuctions,
    getAuctionById,
    addNewOffer,
    getOffersByAuctionId
};
