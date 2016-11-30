/**
 * Alexa Message Renderer
 *
 * This renderer take an defined JSON object and it's used by
 * `reply` to make alexa say something. The structure of the
 * accepted JSON is as follow:
 *
 * - ask/tell/say: one of those is required, you can use any
 *                 the main difference is:
 *                 * ask: says something, then asks the user
 *                        a question.
 *                 * tell: says something, then terminates
 *                         the conversation.
 *                 * say: says something, then it will
 *                        continue processing until it runs
 *                        into an ask or tell.
 *                        It will concatenate the say to the
 *                        begining of the next sentence.
 * - reprompt: the message used if a re-prompt is necessary.
 * - card: the object containing a card to render to the Amazon
 *         Alexa App. See Card Object
 *         https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/alexa-skills-kit-interface-reference#card-object.
 *
 * Examples:
 *
 * {
 *   Help: { HelpStartMenu: { say: "Okay, I'd be happy to help." } },
 *   ExitIntent: { tell: "Okay, for more visit example.com." }
 * }
 *
 * Copyright (c) 2016 Rain Agency.
 * Licensed under the MIT license.
 */

'use strict';

var template = require('./template')
    , _ = require('lodash')
    , Promise = require('bluebird')
  ;

module.exports = function (responses, variables) {

  return function (msgPath, data) {
    var params = Array.prototype.slice.call(arguments,1);
    var msg = _.cloneDeep(_.at(responses, msgPath)[0]),
        toRender = ['ask', 'tell', 'say', 'reprompt', 'card.title', 'card.content', 'card.text', 'card.image.smallImageUrl', 'card.image.largeImageUrl'];

    return Promise.all(_(toRender).map(function (key) {
      var statement = _.at(msg, key)[0];
      if (!statement) return null;
      return render(statement, params).then(function (rendered) {
        return _.set(msg, key, rendered);
      });
    }).compact().value()).then(function () {
      return msg;
    });
  };

  function render(statement,params) {
    var tokens = template.tokens(statement),
        qVariables = tokens.map(function (token) {
          var variable = variables[token];
          if (!variable) return Promise.reject(new Error('No such variable ' + token));
          return Promise.try(function () {
            return variable.apply(variable,params);
          });
        }),
        qAll = Promise.all(qVariables)
    ;

    return qAll.then(function (vars) {
      var tokensWithVars = _.zip(tokens, vars),
          data = _.fromPairs(tokensWithVars);

      return template(statement, data);
    });
  }
};
