/**
 * Currency modifier
 *
 * Copyright (c) 2016 Rain Agency.
 * Licensed under the MIT license.
 */

'use strict';

var _ = require('lodash')
  ;

var codes = { //Right now we're US only :)
  'USD': {
    whole: ['dollar', 'dollars'],
    fractional: ['cent', 'cents']
  },
  'CAD': {
    whole: ['dollar', 'dollars'],
    fractional: ['cent', 'cents']
  },
  'PLN': {
    whole: ['zwoti', 'zwoteh'],
    fractional: ['cent', 'cents']
  },
  'unknown': {
    whole: ['', ''],
    fractional: ['', '']
  }
};

exports.say = function (amount, currencyCode) {
  var code = codes[currencyCode] || codes['unknown'],
      whole = Math.floor(amount),
      wholeTxt = pluralize(whole, code.whole),
      fractional = Math.round((amount - whole) * 100),
      fractionalTxt = pluralize(fractional, code.fractional),
      wholePart = wholePart != 0 ? wholeTxt : null,
      fractionalPart = fractional != 0 ? fractionalTxt : null,
      pieces = [wholePart, fractionalPart].filter(function (x) {
    return !!x;
  });
  return pieces.length ? pieces.join(' and ') : wholeTxt;
};

function pluralize(amount, units) {
  if (amount == 1) return amount + ' ' + units[0];
  return amount + ' ' + units[1];
}

exports.sayInBlocks = function (amount) {
  var whole = Math.floor(amount),
      fractional = Math.round((amount - whole) * 100),
      pieces = _.compact([whole, fractional]);
  return pieces.length ? pieces.join(' ') : '';
}
