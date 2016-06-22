/**
 * Simple Template Engine Tests
 *
 * Copyright (c) 2016 Rain Agency.
 * Licensed under the MIT license.
 */

'use strict';

var assert = require('chai').assert
		, template = require('../').template
	;

describe('template', function () {
  itIs('a bare string', 'a bare string');
  itIs('a {foo} string', 'a bar string');
  itIs('{foo} string', 'bar string');
  itIs('a {foo}', 'a bar');

  describe('tokens', function () {
    itFinds('no tokens', '', []);
    itFinds('a token', '{a}', ['a']);
    itFinds('several tokens', '{a} and then some {b}', ['a', 'b']);
    itFinds('no repeats', '{a} and then some {a}', ['a']);
    itFinds('long tokens', '{abba} and then some {a}', ['abba', 'a']);

    function itFinds(testname, str, expect) {
      it(testname, function () {
        assert.deepEqual(template.tokens(str), expect);
      });
    }
  });
});

function itIs(str, shouldBe) {
  it(str, function () {
    var actual = template(str, { foo: 'bar' });
    assert.equal(actual, shouldBe);
  });
}