'use strict';

var config = require('./config.js'),
    jqLite = require('./lib/jqLite.js'),
    util = require('./lib/util.js'),
    btnClass = config.cssPrfx + 'btn',
    btnFlatClass = config.cssPrfx + 'btn-flat',
    btnFloatingClass = config.cssPrfx + 'btn-floating',
    rippleClass = config.cssPrfx + 'ripple-effect',
    animationName = config.cssPrfx + 'btn-inserted';


function initialize(buttonEl) {
  // check flag
  if (buttonEl._muiRipple === true) return;
  else buttonEl._muiRipple = true;

  // exit if element is INPUT (doesn't support absolute positioned children)
  if (buttonEl.tagName === 'INPUT') return;

  // attach mousedown handler
  jqLite.on(buttonEl, 'mousedown', mousedownHandler);
}


function mousedownHandler(ev) {
  // only left clicks
  if (ev.button !== 0) return;

  var buttonEl = this;

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
    var doc = document;

    // markup elements available when method is called
    var elList = doc.getElementsByClassName(btnClass);
    for (var i=elList.length - 1; i >= 0; i--) initialize(elList[i]);

    // listen for new elements
    util.onAnimationStart(animationName, initialize);
  }
};
