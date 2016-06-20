/**
 * Alexa Message Renderer
 *
 * Copyright (c) 2016 Rain Agency.
 * Licensed under the MIT license.
 */

'use strict';

var assert = require('chai').assert
		, messageRenderer = require('../').messageRenderer
		, Promise = require('bluebird')
	;

var juice = false;
var data = {
  drink: 'water',
  juice: 'V8',
  small_image: 'race-car-small'
};

var responses = {
  "Generic": {
    "Say": { say: "I want {a} {drink}" },
    "Tell": { tell: "I want {a} {drink}" },
    "Ask": { ask: "I want {a} {drink}" },
    "Reprompt": { ask: "I want {a} {drink}", reprompt: "{drink}" },
    "NoNeeds": { say: "Do you like trees?" }
  },
  "Card": {
    "Simple": {
      card: {
        type: 'Simple',
        title: 'Blah',
        content: "I want {a} {drink}"
      }
    }
    , "Standard": {
      card: {
        type: 'Standard',
        title: '{a} Blah',
        text: "I want {a} {drink}",
        image: {
          smallImageUrl: "https://carfu.com/resources/card-images/{small_image}.png",
          largeImageUrl: "https://carfu.com/resources/card-images/race-car-large.png"
        }
      }
    }
  }
};

var variables = {
  a: function a(data) {
    return Promise.resolve('a');
  },
  drink: function drink(data) {
    return Promise.resolve(juice ? data.juice : data.drink);
  },
  small_image: function small_image(data) {
    return Promise.resolve(data.small_image);
  }
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
        if (msg == 'Card.Standard') juice = true;
        assert.deepEqual(actual, shouldBe);
      }).then(function () {
        return done();
      }).catch(done);
    });
  }
});