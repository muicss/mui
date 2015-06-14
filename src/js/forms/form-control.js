/**
 * MUI CSS/JS form-control module
 * @module forms/form-control
 */

'use strict';


var jqLite = require('../lib/jqLite.js'),
    util = require('../lib/util.js'),
    cssSelector = '.mui-form-control',
    emptyClass = 'mui-empty',
    notEmptyClass = 'mui-not-empty',
    dirtyClass = 'mui-dirty',
    formControlClass = 'mui-form-control',
    floatingLabelClass = 'mui-form-floating-label';


/**
 * Initialize input element.
 * @param {Element} inputEl - The input element.
 */
function initialize(inputEl) {
  // check flag
  if (inputEl._muiFormControl === true) return;
  else inputEl._muiFormControl = true;

  if (inputEl.value.length) jqLite.addClass(inputEl, notEmptyClass);
  else jqLite.addClass(inputEl, emptyClass);

  jqLite.on(inputEl, 'input', inputHandler);

  // add dirty class on focus
  jqLite.on(inputEl, 'focus', function(){jqLite.addClass(this, dirtyClass);});
}


/**
 * Handle input events.
 */
function inputHandler() {
  var inputEl = this;

  if (inputEl.value.length) {
    jqLite.removeClass(inputEl, emptyClass);
    jqLite.addClass(inputEl, notEmptyClass);
  } else {
    jqLite.removeClass(inputEl, notEmptyClass);
    jqLite.addClass(inputEl, emptyClass)
  }

  jqLite.addClass(inputEl, dirtyClass);
}


/** Define module API */
module.exports = {
  /** Initialize input elements */
  initialize: initialize,
  
  /** Initialize module listeners */
  initListeners: function() {
    var doc = document;
    
    // markup elements available when method is called
    var elList = doc.querySelectorAll(cssSelector);
    for (var i=elList.length - 1; i >= 0; i--) initialize(elList[i]);

    // listen for new elements
    util.onNodeInserted(function(el) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') initialize(el);
    });

    // add transition css for floating labels
    setTimeout(function() {
      var css = '.' + floatingLabelClass + '{' + [
        '-webkit-transition',
        '-moz-transition',
        '-o-transition',
        'transition',
        ''
      ].join(':all .15s ease-out;') + '}';
      
      util.loadStyle(css);
    }, 150);

    // pointer-events shim for floating labels
    if (util.supportsPointerEvents() === false) {
      jqLite.on(document, 'click', function(ev) {
        var targetEl = ev.target;

        if (targetEl.tagName === 'LABEL' &&
            jqLite.hasClass(targetEl, floatingLabelClass)) {
          var inputEl = targetEl.previousElementSibling;
          if (jqLite.hasClass(inputEl, formControlClass)) inputEl.focus();
        }
      });
    }
  }
};
