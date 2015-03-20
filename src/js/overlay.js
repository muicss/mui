/**
 * MUI CSS/JS overlay module
 * @module overlay
 */

'use strict';


var util = require('./lib/util.js'),
    jqLite = require('./lib/jqLite.js'),
    bodyClass = 'mui-overlay-on',
    overlayId = 'mui-overlay';


/**
 * Turn overlay on/off
 * @param {string} action Turn overlay "on"/"off".
 * @param {object} [options]
 * @config {boolean} [keyboard] If true, close if escape key is pressed.
 * @config {boolean} [static] If false, close if backdrop is clicked.
 * @param {Element} [childElement] Child element to add to overlay.
 */
function overlayFn2(action) {
  if (action === 'on') {
    // extract arguments
    var arg, options, childElement;
    
    // pull options and childElement from arguments
    for (var i=arguments.length - 1; i > 0; i--) {
      arg = arguments[i];
      
      switch (jqLite.type(arg)) {
      case 'Object':
        options = arg;
        break;
      case 'HTMLDivElement':
        childElement = arg;
        break;
      }
    }

    // option defaults
    options = options || {};
    options.keyboard = (options.keyboard === undefined ? true : false);
    options.static = (options.static === undefined ? true : false);

    // execute method
    overlayEl = overlayOn(options, childElement);

  } else if (action === 'off') {
    overlayEl = overlayOff();

  } else {
    // raise error
    util.raiseError("Expecting 'on' or 'off'");
  }

  return overlayEl;
}


function overlayOn(options, childElement) {
  var bodyEl = document.body,
      overlayEl = document.getElementById(overlayId);
    
  // add overlay
  jqLite.addClass(bodyEl, bodyClass);

  if (!overlayEl) {
    // create overlayEl
    overlayEl = document.createElement('div');
    overlayEl.setAttribute('id', overlayId);
    
    // add child element
    if (childElement) overlayEl.appendChild(childElement);
    
    bodyEl.appendChild(overlayEl);
    
  } else {
    // remove existing children
    while (overlayEl.firstChild) overlayEl.removeChild(overlayEl.firstChild);
    
    // add child element
    if (childElement) overlayEl.appendChild(childElement);
  }

  // handle options
  if (options.keyboard) jqLite.on(document, 'keypress', onKeypress);
  else jqLite.off(document, 'keypress', onKeypress);

  if (options.static) jqLite.off(overlayEl, 'click', onClick);
  else jqLite.on(overlayEl, 'click', onClick);
  
  return overlayEl;
}


function overlayOff() {
  var overlayEl = document.getElementById(overlayId);

  // remove overlayEl from body
  if (overlayEl) overlayEl.parentNode.removeChild(overlayEl);
  jqLite.removeClass(document.body, bodyClass);

  // remove option handlers
  jqLite.off(document, 'keypress', onKeypress);
  jqLite.off(overlayEl, 'click', onClick);
  
  return overlayEl;
}


function overlayFn(arg) {
  var bodyEl = document.body,
      overlayEl = document.getElementById(overlayId);
  
  if (arg === 'on') {
    // add overlay
    jqLite.addClass(bodyEl, bodyClass);

    if (!overlayEl) {
      overlayEl = document.createElement('div');
      overlayEl.setAttribute('id', overlayId);
      bodyEl.appendChild(overlayEl);
    }

  } else if (arg === 'off') {
    // remove overlay
    if (overlayEl) overlayEl.parentNode.removeChild(overlayEl);
    jqLite.removeClass(bodyEl, bodyClass);

  } else {
    // raise error
    util.raiseError("Expecting 'on' or 'off'");
  }

  return overlayEl;
}


/** Define module API */
module.exports = overlayFn;
