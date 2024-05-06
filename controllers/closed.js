
var auctionsService = require('../services/auction');

function get(req, res, next) {
    var closedAuctions = auctionsService.getClosedAuctions();
    res.render('closed', {closedAuctions: closedAuctions});
}

module.exports = {
    get
};
