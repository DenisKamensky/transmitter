const url = require('url');

module.exports = function(link) {
    return url.parse(link, true).query;
}