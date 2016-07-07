/**
 * Alexa Lang Tests
 *
 * Copyright (c) 2016 Rain Agency.
 * Licensed under the MIT license.
 */

'use strict';

var assert = require('chai').assert
		, lang = require('../').lang
	;

describe('lang', function () {
  describe('an', function () {
    itIs('elephant', 'an');
    itIs('owl', 'an');
    itIs('pony', 'a');

    function itIs(enter, out) {
      it(enter + ' => ' + out, function () {
        var actual = lang.an(enter);
        assert.equal(actual, out);
      });
    }
  });

  describe('quantify', function () {
    itIs(1, 'elephant', 'an elephant');
    itIs(2, 'elephant', '2 elephants');
    itIs(1, 'elephant', 'elephant', { articles: false });

    function itIs(quantity, enter, out, options) {
      it(quantity + ' ' + enter + ' => ' + out, function () {
        var actual = lang.quantify(quantity, enter, options);
        assert.equal(actual, out);
      });
    }
  });

  describe('enumerate', function () {
    itIs(['elephant'], 'elephant');
    itIs(['elephant', 'zebras'], 'elephant and zebras');
    itIs(['elephant', 'zebras', 'iguana'], 'elephant, zebras, and iguana');
    itIs(['elephant', 'zebras', 'iguana', 'zeppelins'], 'elephant, zebras, iguana, and zeppelins');

    function itIs(list, expect) {
      it('[' + list.join(',') + '] => ' + expect, function () {
        var actual = lang.enumerate(list);
        assert.equal(actual, expect);
      });
    }
  });
});