/**
 * MUI CSS/JS form-control module
 * @module forms/form-control
 */

'use strict';


var jqLite = require('./lib/jqLite'),
    util = require('./lib/util'),
    animationHelpers = require('./lib/animationHelpers'),
    cssSelector = '.mui-textfield > input, .mui-textfield > textarea',
    floatingLabelClass = 'mui-textfield--float-label';


var touchedClass = 'mui--is-touched',  // hasn't lost focus yet
    untouchedClass = 'mui--is-untouched',
    pristineClass = 'mui--is-pristine',  // user hasn't interacted yet 
    dirtyClass = 'mui--is-dirty',
    emptyClass = 'mui--is-empty',  // control is empty
    notEmptyClass = 'mui--is-not-empty';


/**
 * Initialize input element.
 * @param {Element} inputEl - The input element.
 */
function initialize(inputEl) {
  // check flag
  if (inputEl._muiTextfield === true) return;
  else inputEl._muiTextfield = true;

  // add initial control state classes
  if (inputEl.value.length) jqLite.addClass(inputEl, notEmptyClass);
  else jqLite.addClass(inputEl, emptyClass);

  jqLite.addClass(inputEl, untouchedClass + ' ' + pristineClass);

  // replace `untouched` with `touched` when control loses focus
  jqLite.on(inputEl, 'blur', function blurHandler () {
    // ignore if event is a window blur
    if (document.activeElement === inputEl) return;

    // replace class and remove event handler
    jqLite.removeClass(inputEl, untouchedClass);
    jqLite.addClass(inputEl, touchedClass);
    jqLite.off(inputEl, 'blur', blurHandler);
  });

  // replace `pristine` with `dirty` when user interacts with control
  jqLite.one(inputEl, 'input change', function() {
    jqLite.removeClass(inputEl, pristineClass);
    jqLite.addClass(inputEl, dirtyClass);
  });

  // add change handler
  jqLite.on(inputEl, 'input change', inputHandler);
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
}


/**
 * Handle autofill events.
 */
function autofillHandler(inputEl) {
  // exit if not under css/js control
  if (inputEl._muiTextfield !== true) return;

  // execute inputHandler
  inputHandler.call(inputEl);
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

    // listen for autofill events
    animationHelpers.onAnimationStart('mui-textfield-autofill', function(ev) {
      autofillHandler(ev.target);
    });

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
