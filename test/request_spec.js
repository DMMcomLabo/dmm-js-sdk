var libpath = process.env['DMM_COV'] ? '../lib-cov/' : '../lib/';
var d = require(libpath + 'dmm');
var assert = require('assert');
var should = require('should');

((process.env.DMM_TEST_AFFILIATE_ID && process.env.DMM_TEST_API_ID) ? describe : describe.skip)
('Request API to production server', function () {

  var test_affiliate_id = process.env.DMM_TEST_AFFILIATE_ID;
  var test_api_id       = process.env.DMM_TEST_API_ID;

  d.request(require('request'));

  var client = new d.Client({
      api_id: test_api_id,
      affiliate_id: test_affiliate_id
  });

  describe('basic API response body', function() {
    var resp = {};

    before(function(done) {
      client.product({
        site: "DMM.R18"
      }, function (err, data) {
        resp["err"]  = err;
        resp["data"] = data;
        done();
      });
    });

    (resp.err ? it.skip : it)('should have request and result', function(){
      resp.data.should.have.properties(['request', 'result']);
    });

    (resp.err ? it.skip : it)('should have be object (result)', function(){
      resp.data.result.should.be.Object();
    });

    (resp.err ? it.skip : it)('should have parameters in request', function(){
      resp.data.request.should.have.property('parameters');
    });

    (resp.err ? it.skip : it)('should not have undefined properties in request', function(){
      var params = resp.data.request.parameters;
      var expected = [
        {"key": "api_id",       "type": "string", "val": test_api_id},
        {"key": "affiliate_id", "type": "string", "val": test_affiliate_id},
        {"key": "site",         "type": "string", "val": "DMM.R18"},
      ];

      expected.forEach(function(exp) {
        should.exist(params[exp.key]);
        should.notEqual(typeof params[exp.key], "undefined");
        should.equal(typeof params[exp.key], exp.type);
        should.equal(params[exp.key], exp.val);
      });
    });

    (resp.err ? it.skip : it)('should not have undefined properties in result', function(){
      var params = resp.data.result;
      var expected = [
        {"key": "first_position", "type": "number", "val": 1},
        {"key": "items",          "type": "object", "val": undefined},
        {"key": "result_count",   "type": "number", "val": 20},
        {"key": "status",         "type": "number", "val": 200},
        {"key": "total_count",    "type": "number", "val": 50000},
      ];

      expected.forEach(function(exp) {
        should.exist(params[exp.key]);
        should.notEqual(typeof params[exp.key], "undefined");
        should.equal(typeof params[exp.key], exp.type);
        if (exp.key != "items") {
          // params.item changes each request.
          should.equal(params[exp.key], exp.val);
        }
      });
    });
  });
});
