/**
 * MUI CSS/JS form validation module
 * @module forms/validation
 */

'use strict';


var jqLite = require('../lib/jqLite.js'),
    util = require('../lib/util.js'),
    cssSelector = '.mui-form-control:required',
    emptyClass = 'mui-empty',
    notEmptyClass = 'mui-not-empty';    


/**
 * Initialize input element.
 * @param {Element} inputEl - The input element.
 */
function initialize(inputEl) {
  // check flag
  if (inputEl._muiValidation === true) return;
  else inputEl._muiValidation = true;

  if (inputEl.value.length) jqLite.addClass(inputEl, notEmptyClass);
  else jqLite.addClass(inputEl, emptyClass);

  jqLite.on(inputEl, 'input', function(ev) {
    var inputEl = this;

    if (inputEl.value.length === 0) {
      jqLite.removeClass(inputEl, notEmptyClass);
      jqLite.addClass(inputEl, emptyClass)
    } else {
      jqLite.removeClass(inputEl, emptyClass);
      jqLite.addClass(inputEl, notEmptyClass);
    }
  });
}


/** Define module API */
module.exports = {
  /** Initialize module listeners */
  initListeners: function() {
    var doc = document;

    // markup elements available when method is called
    var elList = doc.querySelectorAll(cssSelector);
    for (var i=elList.length - 1; i >= 0; i--) initialize(elList[i]);

    // listen for new elements
    util.onNodeInserted(function(el) {
      if (el.tagName === 'INPUT' && el.required) initialize(el);
    });
  }
};
