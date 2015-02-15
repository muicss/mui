// 
// Based on Craigtut solution from Codepen (http://codepen.io/Craigtut/)
//
'use strict';

var config = require('./config.js'),
    jqLite = require('./lib/jqLite.js'),
    btnClass = config.cssPrfx + 'btn',
    btnFlatClass = config.cssPrfx + 'btn-flat',
    btnFloatingClass = config.cssPrfx + 'btn-floating',
    rippleClass = config.cssPrfx + 'ripple-effect';


function mousedownHandler(ev) {
  // only left clicks
  if (ev.button !== 0) return;

  var buttonEl = ev.target;

  // exit if element doesn't have button class
  if (!jqLite.hasClass(buttonEl, btnClass)) return;

  // exit if element is INPUT (doesn't support absolute positioned children)
  if (buttonEl.tagName === 'INPUT') return;

  // exit if button is disabled
  if (buttonEl.disabled === true) return;
  
  var rippleEl = document.createElement('div');
  rippleEl.className = rippleClass;

  var offset = jqLite.offset(buttonEl),
      xPos = ev.pageX - offset.left,
      yPos = ev.pageY - offset.top,
      diameter,
      radius;

  // get height
  if (jqLite.hasClass(buttonEl, btnFloatingClass)) {
    diameter = offset.height / 2;
  } else {
    diameter = offset.height;
  }

  radius = diameter / 2;
  
  jqLite.css(rippleEl, {
    height: diameter + 'px',
    width: diameter + 'px',
    top: yPos - radius + 'px',
    left: xPos - radius + 'px'
  });

  buttonEl.appendChild(rippleEl);
  
  window.setTimeout(function() {
    buttonEl.removeChild(rippleEl);
  }, 2000);
}


/**********************************
 * Module API
 **********************************/
module.exports = {
  initListeners: function() {
    jqLite.on(document, 'mousedown', mousedownHandler);
  }
};
