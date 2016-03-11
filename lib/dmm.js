var fs = require('fs');
var q  = require('querystring');

/**
 * Sets credentials and create new client
 * @param  {Object} config credential data
 * @sample
 * var client = new dmm.Client({
 *     api_id: "YOUR-API-ID",
 *     affiliate_id: "YOUR-AFFILIATE-ID"
 * });
 */
function dmmClient(config) {
  if (!(this instanceof dmmClient)) {
    return new dmmClient(config);
  }

  this.credentials = {
    api_id       : config.api_id,
    affiliate_id : config.affiliate_id
  } || {};
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

/**
 * Requests Actress API
 *
 * @param  {Object}   options  request parameters
 * @param  {function} callback callback function that receives the response
 * @sample
 * client.actress({
 *   initial: "あ",
 *   keyword: "あさみ",
 *   bust: 90,
 *   waist: -60,
 *   hip: "85-90",
 *   height: 160,
 *   birthday: "19900101",
 *   sort: "-name",
 *   hits: 20,
 *   offset: 1
 * }, function(err, data){
 *   console.log(data);
 * });
 */
dmmClient.prototype.actress = function (options, callback) {
  if (isFunction(options)) { callback = options; options = {}; }
  this._get('/ActressSearch', options, callback);
}

/**
 * Requests Author API
 *
 * @param  {Object}   options  request parameters
 * @param  {function} callback callback function that receives the response
 * @sample
 * client.author({
 *   floor_id: 40,
 *   initial: "あ",
 *   hits: 100,
 *   offset: 1
 * }, function(err, data){
 *   console.log(data);
 * });
 */
dmmClient.prototype.author = function (options, callback) {
  if (isFunction(options)) { callback = options; options = {}; }
  this._get('/AuthorSearch', options, callback);
}

/**
 * Requests Floor API
 *
 * @param  {function} callback callback function that receives the response
 * @sample
 * client.floor(function(err, data){
 *   console.log(data);
 * });
 */
dmmClient.prototype.floor = function (callback) {
  this._get('/FloorList', null, callback);
}

/**
 * Requests Genre API
 *
 * @param  {Object}   options  request parameters
 * @param  {function} callback callback function that receives the response
 * @sample
 * client.genre({
 *   floor_id: 40,
 *   initial: "あ",
 *   hits: 100,
 *   offset: 1
 * }, function(err, data){
 *   console.log(data);
 * });
 */
dmmClient.prototype.genre = function (options, callback) {
  if (isFunction(options)) { callback = options; options = {}; }
  this._get('/GenreSearch', options, callback);
}

/**
 * Requests Maker API
 *
 * @param  {Object}   options  request parameters
 * @param  {function} callback callback function that receives the response
 * @sample
 * client.maker({
 *   floor_id: 40,
 *   initial: "あ",
 *   hits: 100,
 *   offset: 1
 * }, function(err, data){
 *   console.log(data);
 * });
 */
dmmClient.prototype.maker = function (options, callback) {
  if (isFunction(options)) { callback = options; options = {}; }
  this._get('/MakerSearch', options, callback);
}

/**
 * Requests Product API
 *
 * @param  {Object}   options  request parameters
 * @param  {function} callback callback function that receives the response
 * @sample
 * client.product({
 *   site: "DMM.R18",
 *   service: "mono",
 *   floor: "dvd",
 *   sort: "date",
 *   hits: 20,
 *   offset: 1
 * }, function(err, data){
 *   console.log(data);
 * });
 */
dmmClient.prototype.product = function (options, callback) {
  if (isFunction(options)) { callback = options; options = {}; }
  this._get('/ItemList', options, callback);
}

/**
 * Requests Series API
 *
 * @param  {Object}   options  request parameters
 * @param  {function} callback callback function that receives the response
 * @sample
 * client.series({
 *   floor_id: 40,
 *   initial: "あ",
 *   hits: 100,
 *   offset: 1
 * }, function(err, data){
 *   console.log(data);
 * });
 */
dmmClient.prototype.series = function (options, callback) {
  if (isFunction(options)) { callback = options; options = {}; }
  this._get('/SeriesSearch', options, callback);
}

/**
 * Requests API
 *
 * @param  {string}   path     url path for the request
 * @param  {Object}   params   request parameters
 * @param  {function} callback callback function that receives the response
 * client._get("/ItemList", {
 *   site: "DMM.R18",
 *   service: "mono",
 *   floor: "dvd",
 *   sort: "date",
 *   hits: 20,
 *   offset: 1
 * }, function(err, data){
 *   console.log(data);
 * });
 */
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

/**
 * Check the retrieved paramter is function or not.
 *
 * @param {mixed} value
 */
function isFunction(value) {
  return Object.prototype.toString.call(value) == '[object Function]';
}