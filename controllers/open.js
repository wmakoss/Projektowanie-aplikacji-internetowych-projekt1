
var auctionsService = require('../services/auction');

function get(req, res, next) {
    var openAuctions = auctionsService.getOpenAuctions();
    res.render('open', {openAuctions: openAuctions});
}

module.exports = {
    get
};
