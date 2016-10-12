/**
 * Address modifier
 *
 * Copyright (c) 2016 Rain Agency.
 * Licensed under the MIT license.
 */

'use strict';

var fs = require('fs')
    , path = require('path')
    , _ = require('lodash')
    , states = require('./states.json')
  ;

var rules = fs.readFileSync(path.join(__dirname, 'address-rules.txt'), 'utf8').split(/\r?\n/).map(parseRule).filter(function (x) {
  return x;
});

exports.fromPipes = function(address){
  // e.g. "24 S Center Street|||Spanish Fork|UT|84660|US"
  var parts = address.split('|');
  var abbreviation = parts[4].toUpperCase();
  return {
    line1: parts[0],
    line2: parts[1],
    line3: parts[2],
    city: parts[3],
    state: states[abbreviation] || abbreviation,
    zip: parts[5],
    country: parts[6]
  };
};

exports.say = function (address, def) {
  if (!address) return address;
  if(_.isString(address)) return renderStr(address);
  //Convert object to string first
  def = _.extend({
    "line1": "line1",
    "line2": "line2",
    "line3": "line3",
    "city": "city",
    "zip": "zip",
  },def)

  var strAddress = _.compact([address[def.line1], address[def.line2], address[def.line3], address[def.city]]).join(', ');
  return renderStr(strAddress);

  function renderStr(address) {
    return rules.reduce(function (address, rule) {
      return address.replace(rule.regex, rule.to + ' ');
    }, address)
    .trim();
  }
};

exports.isDeliverable = function (address) {
  if (!(address.country.toLowerCase() === "us")) {
    return false;
  } else if (!(address.line1) || !(address.city) || !(address.state) || !(address.zip) || !(address.country)) {
    return false;
  }
  return true;
};

function parseRule(rule) {
  if (!rule) return null;
  rule = rule.trim();
  if (rule.lastIndexOf('//', 0) == 0) return null;
  var i = rule.indexOf('>'),
      from = rule.substring(0, i).trim(),
      to = rule.substring(i + 1, rule.length).trim(),
      endsWithWord = !!from.substring(from.length - 1).match(/\w/i),
      regex = '\\b' + from.replace('.', '\\.') + '(\\s+)?' + (endsWithWord ? '\\b' : '');
  return {
    from: from,
    regex: new RegExp(regex, 'ig'),
    to: to
  };
}
