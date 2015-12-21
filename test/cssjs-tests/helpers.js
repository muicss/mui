/**
 * Test helpers
 * @module test/helpers
 */


/** Define module API */
module.exports = {
  initDOM: function() {
    // initialize jsdom if document is undefined
    if (typeof (document) === "undefined") require('mocha-jsdom')();
  }
}
