/**
 * MUI CSS/JS form-control module
 * @module forms/form-control
 */

'use strict';


var jqLite = require('./lib/jqLite'),
    util = require('./lib/util'),
    animationHelpers = require('./lib/animationHelpers'),
    cssSelector = '.mui-textfield > input, .mui-textfield > textarea',
    emptyClass = 'mui--is-empty',
    notEmptyClass = 'mui--is-not-empty',
    dirtyClass = 'mui--is-dirty',
    floatingLabelClass = 'mui-textfield--float-label';


/**
 * Initialize input element.
 * @param {Element} inputEl - The input element.
 */
function initialize(inputEl) {
  // check flag
  if (inputEl._muiTextfield === true) return;
  else inputEl._muiTextfield = true;

  if (inputEl.value.length) jqLite.addClass(inputEl, notEmptyClass);
  else jqLite.addClass(inputEl, emptyClass);

  jqLite.on(inputEl, 'input change', inputHandler);

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
    var elList = doc.querySelectorAll(cssSelector),
        i = elList.length;
    while (i--) initialize(elList[i]);

    // listen for new elements
    animationHelpers.onAnimationStart('mui-textfield-inserted', function(ev) {
      initialize(ev.target);
    });

    // add transition css for floating labels
    setTimeout(function() {
      var css = '.mui-textfield.mui-textfield--float-label > label {' + [
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
      jqLite.on(doc, 'click', function(ev) {
        var targetEl = ev.target;

        if (targetEl.tagName === 'LABEL' &&
            jqLite.hasClass(targetEl.parentNode, floatingLabelClass)) {
          var inputEl = targetEl.previousElementSibling;
          if (inputEl) inputEl.focus();
        }
      });
    }
  }
};
