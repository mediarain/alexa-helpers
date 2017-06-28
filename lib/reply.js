/**
 * Alexa Reply
 *
 * See message-renderer to see the msg structure that
 * Reply expects.
 *
 * TODO: validate that no more text is appeneded after
 * has yielded.
 *
 * Copyright (c) 2016 Rain Agency.
 * Licensed under the MIT license.
 */

'use strict';

var _ = require('lodash')
    , S = require("string")
  ;

function Reply(msg, directives) {
  if(_.isArray(msg)) return _.reduce(msg.slice(1), (soFar,msg) => soFar.append(msg) , new Reply(msg[0], directives))
  this.msg = {
    statements: [],
    reprompt: '',
    card: null,
    yield: false,
    hasAnAsk: false,
    directives: typeof directives !== "undefined" ? directives : null
  };
  this.append(msg);
}

Reply.prototype.append = function (msg) {
  if (!msg) return this;
  if(msg.msg) {
    this.msg.statements = this.msg.statements.concat(msg.msg.statements);
    this.msg.reprompt = msg.msg.reprompt || this.msg.reprompt;
    this.msg.card = msg.msg.card || this.msg.card;
    this.msg.yield = this.msg.yield || msg.msg.yield;
    this.msg.hasAnAsk = this.msg.hasAnAsk || msg.msg.hasAnAsk;
    this.msg.directives = msg.msg.directives || this.msg.directives;
  }
  else {
    var statement = msg.ask || msg.tell || msg.say;
    if (statement) this.msg.statements.push(statement);
    this.msg.reprompt = msg.reprompt || this.msg.reprompt;
    this.msg.card = msg.card || this.msg.card;
    this.msg.yield = this.msg.yield || !!(msg.ask || msg.tell);
    this.msg.hasAnAsk = this.msg.hasAnAsk || !!msg.ask;
    this.msg.directives = msg.directives || this.msg.directives;
  }
  return this;
};

Reply.prototype.end = function () {
  this.yield = true;
  return this;
};

Reply.prototype.isYielding = function () {
  return this.msg.yield;
};

Reply.prototype.render = function (int) {
  var intent = int || null;
  var say = wrapSpeech(toSSML(this.msg.statements.join('\n'), intent)),
      reprompt = wrapSpeech(toSSML(this.msg.reprompt, intent));
  return { say: say, reprompt: reprompt };
};

Reply.prototype.write = function (response, intent, session) {
  if (!this.msg.directives && session && session.attributes && session.attributes.directives) {
    this.msg.directives = session.attributes.directives;
  }
  var rendered = this.render(intent);
  if (this.msg.hasAnAsk) {
    response.ask(rendered.say, rendered.reprompt, this.msg.card, this.msg.directives);
  } else {
    response.tell(rendered.say, this.msg.card, this.msg.directives);
  }

  return this;
};

function toSSML(statement, intent) {
  if (!statement) return null;
  if (S(statement).startsWith('<speak>')) return statement;
  statement = statement.replace(/&/g, '&amp;'); //Hack. Full xml escaping would be better, but the & is currently the only special character used.
  return '<speak>' + statement + '</speak>';
}

function wrapSpeech(statement) {
  if (!statement) return null;
  var type = "SSML";
  // check for markup
  var xml = /<[a-z][\s\S]*>/i.test(statement);
  // if no markup is present set the type to PlainText
  if (!xml) type = "PlainText";
  return { speech: statement, type: type };
}

module.exports = Reply;
