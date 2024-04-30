
var sqlite = require('better-sqlite3');

function getAllOffers() {
    var db = sqlite('database.sqlite3');

    var rows = db.prepare("SELECT * FROM offers;").all();

    db.close();

    return rows;
}

module.exports = {
    getAllOffers
};
