/**
 * An extremely simple templating engine.
 *
 * Copyright (c) 2016 Rain Agency.
 * Licensed under the MIT license.
 */

'use strict';

var _ = require('lodash')
	;

var tokenRegx = /{([^}]+)}/g;

module.exports = function (template, data) {
  // We should probably use something the pre-compiles
  return template.replace(tokenRegx, function (match, inner) {
    return data[inner];
  });
};

module.exports.tokens = function (template) {
  return _.uniq((template.match(tokenRegx) || []).map(function (wrappedToken) {
    return wrappedToken.substring(1, wrappedToken.length - 1);
  }));
};
