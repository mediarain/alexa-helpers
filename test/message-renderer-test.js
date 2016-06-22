/**
 * Alexa Message Renderer Tests
 *
 * Copyright (c) 2016 Rain Agency.
 * Licensed under the MIT license.
 */

'use strict';

var assert = require('chai').assert
		, messageRenderer = require('../').messageRenderer
		, responses = require('./extras/responses')
		, variables = require('./extras/variables')
	;

var data = {
  drink: 'water',
  juice: 'V8',
  isJuice: false,
  small_image: 'race-car-small'
};

describe('message renderer', function () {
  var sut = messageRenderer(responses, variables);
  itIs('Replaces say variables', 'Generic.Say', { say: 'I want a water' });
  itIs('Replaces tell variables', 'Generic.Tell', { tell: 'I want a water' });
  itIs('Replaces ask variables', 'Generic.Ask', { ask: 'I want a water' });
  itIs('Replaces reprompt variables', 'Generic.Reprompt', { ask: 'I want a water', reprompt: "water" });
  itIs('Can work with messages without needs ', 'Generic.NoNeeds', { say: 'Do you like trees?' });
  itIs('Processes simple cards', 'Card.Simple', { card: { type: 'Simple', title: 'Blah', content: 'I want a water' } });
  itIs('Processes standard cards', 'Card.Standard', { card: { type: 'Standard', title: 'a Blah', text: 'I want a water', image: { smallImageUrl: "https://carfu.com/resources/card-images/race-car-small.png", largeImageUrl: "https://carfu.com/resources/card-images/race-car-large.png" } } });
  itIs('Processes standard cards clone deeply', 'Card.Standard', { card: { type: 'Standard', title: 'a Blah', text: 'I want a V8', image: { smallImageUrl: "https://carfu.com/resources/card-images/race-car-small.png", largeImageUrl: "https://carfu.com/resources/card-images/race-car-large.png" } } });

  function itIs(testName, msg, shouldBe) {
    it(testName, function (done) {
      sut(msg, data).then(function (actual) {
        if (msg == 'Card.Standard') data.isJuice = true;
        assert.deepEqual(actual, shouldBe);
      }).then(function () {
        return done();
      }).catch(done);
    });
  }
});