/**
 * Currency Tests
 *
 * Copyright (c) 2016 Rain Agency.
 * Licensed under the MIT license.
 */

'use strict';

var assert = require('chai').assert
    , currency = require('../').currency
  ;

describe('currency', function () {
  itIs('says zero amounts', 0, '0 dollars');
  itIs('says singular', 1, '1 dollar');
  itIs('says plural', 2, '2 dollars');
  itIs('says cents', 2.45, '2 dollars and 45 cents');
  itIs('says singular cents', 2.01, '2 dollars and 1 cent');
  itIs('says real case', 278.96, '278 dollars and 96 cents');
  itIs('says common case with cents', 45.99, '45 99', true);
  itIs('says common case with cero cents', 45.0, '45', true);
  itIs('says common case with no cents at all', 45, '45', true);
});

function itIs(testName, amount, shouldBe, inBlocks) {
  var inBlocks = inBlocks || false;
  it(testName, function () {
    var actual = inBlocks ? currency.sayInBlocks(amount) : currency.say(amount, 'USD');
    assert.equal(actual, shouldBe);
  });
}
