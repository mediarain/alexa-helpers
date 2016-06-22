/**
 * Responses for tests
 *
 * Copyright (c) 2016 Rain Agency.
 * Licensed under the MIT license.
 */

var responses = function () {
  return {
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
  }
}();

module.exports = responses;