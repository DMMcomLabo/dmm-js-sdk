var dmm = require('../lib/dmm');
dmm.request(require('httpplease'));
dmm.set_env("browser");

module.exports = dmm;

window.dmm = dmm;