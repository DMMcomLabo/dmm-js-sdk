var assert = require('assert');
var helper = require('./helper');
var client = helper.client;

describe('Series API', function () {

  before(function () {
    helper.stubGet(client);
  });

  describe('basic API request', function () {

    before(function (done) {
      this.callback = function () { done(); };
      client.series(this.callback);
    });

    helper.properCall.bind(this)(client, function () {
      return {
        method: 'get',
        path: '/SeriesSearch',
        options: {},
        callback: this.callback
      };
    });
  });
});