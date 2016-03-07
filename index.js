var dmm = require('./lib/dmm');
dmm.request(require('request'));
dmm.set_env("node");

module.exports = dmm;