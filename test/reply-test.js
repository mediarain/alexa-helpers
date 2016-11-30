/**
 * Alexa Reply Tests
 *
 * Copyright (c) 2016 Rain Agency.
 * Licensed under the MIT license.
 */

'use strict';

var assert = require('chai').assert
    , _ = require('lodash')
    , Reply = require('../').reply
    , messageRenderer = require('../').messageRenderer
    , responses = require('./extras/responses')
    , variables = require('./extras/variables')
    , Promise = require('bluebird')
  ;

var data = {
  drink: 'water',
  juice: 'V8',
  isJuice: false,
};

describe('reply', function () {
  var sut = messageRenderer(responses, variables);
  itIs('With say', 'Generic.Say', { say: { speech: '<speak>I want a water</speak>', type: 'SSML' }, reprompt: null });
  itIs('With tell', 'Generic.Tell', { say: { speech: '<speak>I want a water</speak>', type: 'SSML' }, reprompt: null });
  itIs('With ask', 'Generic.Ask', { say: { speech: '<speak>I want a water</speak>', type: 'SSML' }, reprompt: null });
  itIs('With reprompt', 'Generic.Reprompt', { say: { speech: '<speak>I want a water</speak>', type: 'SSML' }, reprompt: { speech: '<speak>water</speak>', type: 'SSML' } });
  itIs('With messages without needs', 'Generic.NoNeeds', { say: { speech: '<speak>Do you like trees?</speak>', type: 'SSML' }, reprompt: null});

  function itIs(testName, msgs, shouldBe) {
    it(testName, function (done) {
      if (!_.isArray(msgs)) {
        msgs = [msgs];
      }
      Promise.all(
        _(msgs)
          .map(function(key) {
            return sut(key, data).then(function(statement) {
              return statement;
            });
          })
        .compact()
        .value()
      )
      .then(function(msgs) {
        var reply = new Reply();
        for (var key in msgs) {
          var msg = msgs[key];
          reply.append(msg);
        }
        return reply.render();
      })
      .then(function(actual) {
        assert.deepEqual(actual, shouldBe);
      })
      .then(function() {
        return done();
      })
      .catch(done);
    });
  }

  it('It can append of it\'s own type',function(){
    var reply = new Reply({say: 'Hi'});
    reply.append(new Reply({tell: 'Goodbye'}));
    var actual = reply.render();
    assert.deepEqual('<speak>Hi\nGoodbye</speak>',actual.say.speech);
  })

  it('It can take in an array of options',function(){
    var reply = new Reply([{say: 'Hi'},{say: 'Goodbye'}]);
    var actual = reply.render();
    assert.deepEqual('<speak>Hi\nGoodbye</speak>',actual.say.speech);
  })

});
