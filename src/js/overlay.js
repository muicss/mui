/**
 * MUI CSS/JS overlay module
 * @module overlay
 */

'use strict';


var util = require('./lib/util.js'),
    jqLite = require('./lib/jqLite.js'),
    bodyClass = 'mui-overlay-on',
    overlayId = 'mui-overlay';


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
