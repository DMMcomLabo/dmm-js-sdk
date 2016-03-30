# DMM SDK for js
[![License](http://img.shields.io/badge/license-mit-blue.svg?style=flat-square)](https://github.com/DMMcomLabo/dmm-js-sdk/blob/master/LICENSE)
[![Build Status](http://img.shields.io/travis/DMMcomLabo/dmm-js-sdk.svg?style=flat-square)](https://travis-ci.org/DMMcomLabo/dmm-js-sdk)
[![Coverage Status](https://img.shields.io/coveralls/DMMcomLabo/dmm-js-sdk.svg?style=flat-square)](https://coveralls.io/github/DMMcomLabo/dmm-js-sdk?branch=master)

[![NPM](https://nodei.co/npm-dl/dmm.js.png?months=9&height=3)](https://nodei.co/npm/dmm.js/)
[![NPM](https://nodei.co/npm/dmm.js.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/dmm.js/)

DMM Web API version.3 クライアント

## インストール

``` bash
npm install dmm.js
```

## ブラウザ用のjsファイル作成
``` bash
browserify browser/index.js -o dist/dmm.js
```

## 使用方法

### ブラウザの場合

``` javascript
var client = new dmm.Client({
    api_id: "YOUR-API-ID",
    affiliate_id: "YOUR-AFFILIATE-ID"
});

client.product({
  site: "DMM.R18"
}, function (err, data) {
  console.log(err);
  console.log(data);
});
```

### nodejsの場合

``` javascript
// client新規作成
var dmm = require('dmm.js');
var client = new dmm.Client({
    api_id: "YOUR-API-ID",
    affiliate_id: "YOUR-AFFILIATE-ID"
});

client.product({
  site: "DMM.R18"
}, function (err, data) {
  console.log(err);
  sys.print(sys.inspect(data)+"\n");
});

```

## メソッド
**女優検索API**

``` javascript
client.actress(options, callback);

// 例
client.actress({
  initial: "あ",
  keyword: "あさみ",
  bust: 90,
  waist: -60,
  hip: "85-90",
  height: 160,
  birthday: "19900101",
  sort: "-name",
  hits: 20,
  offset: 1
}, function(err, data){
  console.log(data);
});
```

**作者検索API**

``` javascript
client.author(options, callback);

// 例
client.author({
  floor_id: 40,
  initial: "あ",
  hits: 100,
  offset: 1
}, function(err, data){
  console.log(data);
});

```

**フロアAPI**

``` javascript
client.floor(callback);

// 例
client.floor(function(err, data){
  console.log(data);
});

```

**ジャンル検索API**

``` javascript
client.genre(options, callback);

// 例
client.genre({
  floor_id: 40,
  initial: "あ",
  hits: 100,
  offset: 1
}, function(err, data){
  console.log(data);
});

```

**メーカー検索API**

``` javascript
client.maker(options, callback);

// 例
client.maker({
  floor_id: 40,
  initial: "あ",
  hits: 100,
  offset: 1
}, function(err, data){
  console.log(data);
});
```

**商品検索API**

``` javascript
client.product(options, callback);

// 例
client.product({
  site: "DMM.R18",
  service: "mono",
  floor: "dvd",
  sort: "date",
  hits: 20,
  offset: 1
}, function(err, data){
  console.log(data);
});
```

**シリーズ検索API**

``` javascript
client.series(options, callback);

// 例
client.series({
  floor_id: 40,
  initial: "あ",
  hits: 100,
  offset: 1
}, function(err, data){
  console.log(data);
});
```

## 開発者向け

### テスト実行

``` bash
make test
```

### ドキュメンテーション作成

``` bash
make docs
```
