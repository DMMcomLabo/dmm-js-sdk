var assert = require('assert');
var helper = require('./helper');
var client = helper.client;

describe('actress API', function () {

  before(function () {
    helper.stubGet(client);
  });

  describe('basic API request', function () {

    before(function (done) {
      this.callback = function () { done(); };
      client.actress(this.callback);
    });

    helper.properCall.bind(this)(client, function () {
      return {
        method: 'get',
        path: '/ActressSearch',
        options: {},
        callback: this.callback
      };
    });
  });
});