var dmm = require('../lib/dmm');
dmm.request(require('httpplease'));

module.exports = dmm;

window.dmm = dmm;