var fs = require('fs');
var q  = require('querystring');

function dmmClient(config) {
  if (!(this instanceof dmmClient)) {
    return new dmmClient(config);
  }

  this.credentials = {
    api_id       : config.api_id,
    affiliate_id : config.affiliate_id
  } || {};

  delete config;
}

var request;
var run_env;

module.exports = {
  Client: dmmClient,

  request: function(req) {
    request = req;
  },

  set_env: function(env) {
    run_env = env;
  }
}

var baseURL = 'https://api.dmm.com/affiliate/v3';
var version = require('../package.json').version;

dmmClient.prototype.actress = function (options, callback) {
    if (isFunction(options)) { callback = options; options = {}; }
    this._get('/ActressSearch', options, callback);
}

dmmClient.prototype.author = function (options, callback) {
    if (isFunction(options)) { callback = options; options = {}; }
    this._get('/AuthorSearch', options, callback);
}

dmmClient.prototype.floor = function (options, callback) {
    if (isFunction(options)) { callback = options; options = {}; }
    this._get('/FloorList', options, callback);
}

dmmClient.prototype.genre = function (options, callback) {
    if (isFunction(options)) { callback = options; options = {}; }
    this._get('/GenreSearch', options, callback);
}

dmmClient.prototype.maker = function (options, callback) {
    if (isFunction(options)) { callback = options; options = {}; }
    this._get('/MakerSearch', options, callback);
}

dmmClient.prototype.product = function (options, callback) {
    if (isFunction(options)) { callback = options; options = {}; }
    this._get('/ItemList', options, callback);
}

dmmClient.prototype.series = function (options, callback) {
    if (isFunction(options)) { callback = options; options = {}; }
    this._get('/SeriesSearch', options, callback);
}

dmmClient.prototype._get = function (path, params, callback) {
    params              = params || {};
    params.api_id       = this.credentials.api_id;
    params.affiliate_id = this.credentials.affiliate_id;

    request.get({
      url: baseURL + path + '?' + q.stringify(params),
      json: true,
      followRedirect: false
    }, requestCallback(callback));
}

function requestCallback(callback) {
  if (!callback) return undefined;
  return function (err, response, body) {
    if (err) return callback(err);
    if (run_env == "browser") {
      if (response && response.body) {
        var res = JSON.parse(response.body);
        var result = (res && res.result) ? res.result : res;
        return callback(null, result);
      } else {
        return callback(new Error('API error (malformed API response): ' + response));
      }
    } else {
      if (response.statusCode >= 400) {
        var errString = body.meta ? body.meta.msg : body.error;
        return callback(new Error('API error: ' + response.statusCode + ' ' + errString));
      }
      if (body && body.response) {
        return callback(null, body.response);
      } else {
        return callback(new Error('API error (malformed API response): ' + body));
      }
    }
  };
}

function isFunction(value) {
  return Object.prototype.toString.call(value) == '[object Function]';
}