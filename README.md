# Alexa Helpers

Simple library to manage alexa responses and some helpers to improve data transformation.

Responses can include variables escaping them into curly brackets {variable}.

# Example Usage

To manage alexa's responses.

```javascript
var messageRenderer = require('alexa-helpers').messageRenderer
  , Reply = require('alexa-helpers').reply;
...
var responses = {
  "Generic": {
    "Say": { say: "I want {a} {drink}" },
    "Tell": { tell: "I want {a} {drink}" },
    "Ask": { 
      ask: "Do you want a {drink}?",
      reprompt: "Please answer if you want a {drink}.",
      card: {
        type: 'Simple',
        title: 'Blah',
        content: "I want {a} {drink}"
      }
    }
  }
};

var data = {
  drink: 'water'
};

var variables = {
  a: function a(data) {
    return Promise.resolve('a');
  },
  drink: function drink(data) {
    return Promise.resolve(data.drink);
  }
};

var sut = messageRenderer(responses, variables);
sut('Generic.Ask', data).then(function(msg) {
  var reply = new Reply(msg);
  // Send the message/text to alexa
  reply.write(response);
})

```