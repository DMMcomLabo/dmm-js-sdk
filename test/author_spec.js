var assert = require('assert');
var helper = require('./helper');
var client = helper.client;

describe('author API', function () {

  before(function () {
    helper.stubGet(client);
  });

  describe('basic API request', function () {

    before(function (done) {
      this.callback = function () { done(); };
      client.author(this.callback);
    });

    helper.properCall.bind(this)(client, function () {
      return {
        method: 'get',
        path: '/AuthorSearch',
        options: {},
        callback: this.callback
      };
    });
  });
});