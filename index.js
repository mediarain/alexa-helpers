/**
 * Alexa Helpers
 *
 * Copyright (c) 2016 Rain Agency.
 * Licensed under the MIT license.
 */

var exports = module.exports = {};

/*
 * Alexa helpers version
 */

exports.version = '1.0.1';

/*
 * Simple template engine
 */

var template = require('./lib/template');
exports.template = template;

/*
 * Message renderer
 */

var messageRenderer = require('./lib/message-renderer');
exports.messageRenderer = messageRenderer;

/*
 * Reply
 */
var reply = require('./lib/reply');
exports.reply = reply;

/*
 * Address modifier
 */

var address = require('./lib/address');
exports.address = address;

/*
 * Currency modifier
 */

var currency = require('./lib/currency');
exports.currency = currency;

/*
 * Language modifier
 */

var lang = require('./lib/lang');
exports.lang = lang;
