/**
 * MUI CSS/JS forms module
 * @module forms
 */

'use strict';


var jqLite = require('./lib/jqLite.js'),
    util = require('./lib/util.js'),
    formControlClass = 'mui-form-control',
    formGroupClass = 'mui-form-group',
    floatingLabelBaseClass = 'mui-form-floating-label',
    floatingLabelActiveClass = floatingLabelBaseClass + '-active',
    animationName = 'mui-form-floating-label-inserted',
    _supportsPointerEvents;    


/**
 * Initialize floating labels.
 * @param {Element} labelEl - The floating label element.
 */
function initialize(labelEl) {
  // check flag
  if (labelEl._muiFloatLabel === true) return;
  else labelEl._muiFloatLabel = true;
  
  var inputEl = labelEl.previousElementSibling;

  if (inputEl.value.length) jqLite.addClass(labelEl, floatingLabelActiveClass);

  // handle input events
  jqLite.on(inputEl, 'input', inputHandler);
  
  // add transition after timeout to avoid screen jitter
  setTimeout(function() {
    var s = '.15s ease-out';

    jqLite.css(labelEl, {
      '-webkit-transition': s,
      '-moz-transition': s,
      '-o-transition': s,
      'transition': s
    });
  }, 150);

  // pointer-events shim
  if (supportsPointerEvents() === false) {
    jqLite.css(labelEl, 'cursor', 'text');
    jqLite.on(labelEl, 'click', function() {
      if (!jqLite.hasClass(labelEl, floatingLabelActiveClass)) inputEl.focus();
    });
  }
}


/**
 * Handle inputs into the form control.
 * @param {Event} ev - The DOM event.
 */
function inputHandler(ev) {
  var inputEl = ev.target,
      labelEl = inputEl.nextElementSibling;

  if (jqLite.hasClass(labelEl, floatingLabelBaseClass)) {
    if (inputEl.value.length === 0) {
      jqLite.removeClass(labelEl, floatingLabelActiveClass);
    } else {
      jqLite.addClass(labelEl, floatingLabelActiveClass);
    }
  }
}


/**
 * Activate the floating label
 * @param {Element} labelEl - The floating label element.
 */
function activateLabel(labelEl) {
  jqLite.addClass(labelEl, floatingLabelActiveClass);

  if (supportsPointerEvents() === false) {
    jqLite.css(labelEl, 'cursor', 'default');
  }
}


/**
 * De-activate the floating label
 * @param {Element} labelEl - The floating label element.
 * @param {Element} inputEl - The form-control input element.
 */
function deactivateLabel(labelEl, inputEl) {
  jqLite.removeClass(labelEl, floatingLabelActiveClass);
}


/**
 * Check if client supports pointer events.
 */
function supportsPointerEvents() {
  // check cache
  if (_supportsPointerEvents !== undefined) return _supportsPointerEvents;
  
  var element = document.createElement('x');
  element.style.cssText = 'pointer-events:auto';
  _supportsPointerEvents = (element.style.pointerEvents === 'auto');
  return _supportsPointerEvents;
}


/** Define module API */
module.exports = {
  /** The form control class name */
  formControlClass: formControlClass,

  /** The form group class name */
  formGroupClass: formGroupClass,

  /** The floating label base class name */
  floatingLabelBaseClass: floatingLabelBaseClass,

  /** The active floating label class name */
  floatingLabelActiveClass: floatingLabelActiveClass,

  /** Initialize floating label element */
  initialize: initialize,

  /** Initialize module listeners */
  initListeners: function() {
    var doc = document;

    // markup elements available when method is called
    var elList = doc.getElementsByClassName(floatingLabelBaseClass);
    for (var i=elList.length - 1; i >= 0; i--) initialize(elList[i]);

    // listen for new elements
    util.onNodeInserted(function(el) {
      if (jqLite.hasClass(el, floatingLabelBaseClass)) initialize(el);
    });
  }
};
