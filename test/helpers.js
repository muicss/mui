// Test helpers

module.exports = {
  initDOM: function() {
    // initialize jsdom if document is undefined
    if (typeof (document) === "undefined") require('mocha-jsdom')();
  }
}
