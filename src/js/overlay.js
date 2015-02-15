'use strict';

var config = require('./config.js'),
    util = require('./lib/util.js'),
    jqLite = require('./lib/jqLite.js'),
    bodyClass = config.cssPrfx + 'overlay-on',
    overlayId = config.cssPrfx + 'overlay';


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


/**************************
 * Module API
 **************************/
module.exports = overlayFn;
