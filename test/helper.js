var libpath = process.env['DMM_COV'] ? '../lib-cov/' : '../lib/';
var d = require(libpath + 'dmm');
var assert = require('assert');

assert.sameRequest = function(original, other) {
    ['callback', 'options', 'path', 'method'].forEach(function(thing) {
        this.deepEqual(original[thing], other[thing]);
    }.bind(this));
};

d.request(require('request'));

var dummy_api_id = "UrwskPfkqQ0DuVry2gYL";
var dummy_affiliate_id = "10278-996";

module.exports = {

    properCall: function(client, dcb) {
        before(function() {
            this.proper = dcb.bind(this)();
        });
        it('should use the proper request method', function() {
            client.lastCall.method.should.equal(this.proper.method);
        });
        it('should use the proper path', function() {
            client.lastCall.path.should.equal(this.proper.path);
        });
        it('should use the proper options', function() {
            client.lastCall.options.should.eql(this.proper.options);
        });
        it('should use the proper callback', function() {
            client.lastCall.callback.should.equal(this.proper.callback);
        });
    },

    stubGet: function(client, err, data) {
        client._get = function(path, options, callback) {
            client.lastCall = {
                method: 'get',
                path: path,
                options: options,
                callback: callback
            };
            callback(err, data);
        };
    },

    client: new d.Client({
        api_id: dummy_api_id,
        affiliate_id: dummy_affiliate_id
    })

};
