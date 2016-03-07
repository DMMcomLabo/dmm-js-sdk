var assert = require('assert');
var helper = require('./helper');
var client = helper.client;

describe('Product API', function () {

  before(function () {
    helper.stubGet(client);
  });

  describe('basic API request', function () {

    before(function (done) {
      this.callback = function () { done(); };
      client.product(this.callback);
    });

    helper.properCall.bind(this)(client, function () {
      return {
        method: 'get',
        path: '/ItemList',
        options: {},
        callback: this.callback
      };
    });
  });

  describe('API request with options', function () {

    before(function (done) {
      this.options  = {site:"DMM.com", hits:30, limit:0}
      this.callback = function () { done(); };
      client.product(this.options, this.callback);
    });

    helper.properCall.bind(this)(client, function () {
      return {
        method: 'get',
        path: '/ItemList',
        options: this.options,
        callback: this.callback
      };
    });
  });
});