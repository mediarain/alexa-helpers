/**
 * Variables for tests
 *
 * Copyright (c) 2016 Rain Agency.
 * Licensed under the MIT license.
 */

var Promise = require('bluebird')
  ;

var variables = {
  a: function a(data) {
    return Promise.resolve('a');
  },
  drink: function drink(data) {
    return Promise.resolve(data.isJuice ? data.juice : data.drink);
  },
  small_image: function small_image(data) {
    return Promise.resolve(data.small_image);
  }
};

module.exports = variables;