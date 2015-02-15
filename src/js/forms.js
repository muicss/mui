'use strict';

var config = require('./config.js'),
    jqLite = require('./lib/jqLite.js'),
    formControlClass = config.cssPrfx + 'form-control',
    formGroupClass = config.cssPrfx + 'form-group',
    floatingLabelBaseClass = config.cssPrfx + 'form-floating-label',
    floatingLabelActiveClass = floatingLabelBaseClass + '-active';


function processLabel(labelEl) {
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


function activateLabel(labelEl) {
  jqLite.addClass(labelEl, floatingLabelActiveClass);

  if (supportsPointerEvents() === false) {
    jqLite.css(labelEl, 'cursor', 'default');
  }
}


function deactivateLabel(labelEl, inputEl) {
  jqLite.removeClass(labelEl, floatingLabelActiveClass);

  if (supportsPointerEvents() === false) {
  }
}


/******************************
 * Utilities
 ******************************/
var _supportsPointerEvents;

function supportsPointerEvents() {
  // check cache
  if (_supportsPointerEvents !== undefined) return _supportsPointerEvents;
  
  var element = document.createElement('x');
  element.style.cssText = 'pointer-events:auto';
  _supportsPointerEvents = (element.style.pointerEvents === 'auto');
  return _supportsPointerEvents;
}


/******************************
 * Module API
 ******************************/
module.exports = {
  formControlClass: formControlClass,
  formGroupClass: formGroupClass,
  floatingLabelBaseClass: floatingLabelBaseClass,
  floatingLabelActiveClass: floatingLabelActiveClass,
  processLabel: processLabel,
  initListeners: function() {
    var doc = document;

    // markup elements available when method is called
    var elList = doc.getElementsByClassName(floatingLabelBaseClass);
    for (var i=0; i < elList.length; i++) processLabel(elList[i]);
    
    // listen for new elements
    function handlerFn(ev) {
      if (ev.animationName !== 'muiNodeInserted') return;
      processLabel(ev.target);
    }
    
    jqLite.on(doc, 'animationstart', handlerFn);
    jqLite.on(doc, 'mozAnimationStart', handlerFn);
    jqLite.on(doc, 'webkitAnimationStart', handlerFn);
  }
};
