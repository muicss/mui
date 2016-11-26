/**
 * MUI CSS/JS ripple module
 * @module ripple
 */

'use strict';


var jqLite = require('./lib/jqLite'),
    util = require('./lib/util'),
    animationHelpers = require('./lib/animationHelpers'),
    supportsTouch = 'ontouchstart' in document.documentElement,
    mouseDownEvents = (supportsTouch) ? 'touchstart' : 'mousedown',
    mouseUpEvents = (supportsTouch) ? 'touchend' : 'mouseup mouseleave';


/**
 * Add ripple effects to button element.
 * @param {Element} buttonEl - The button element.
 */
function initialize(buttonEl) {
  // check flag
  if (buttonEl._muiRipple === true) return;
  else buttonEl._muiRipple = true;

  // exit if element is INPUT (doesn't support absolute positioned children)
  if (buttonEl.tagName === 'INPUT') return;

  // add ripple container (to avoid https://github.com/muicss/mui/issues/169)
  var el = document.createElement('span');
  el.className = 'mui-btn__ripple-container';
  el.innerHTML = '<span class="mui-ripple"></span>';
  buttonEl.appendChild(el);

  // cache reference to ripple element
  buttonEl._rippleEl = el.children[0];

  // attach event handler
  jqLite.on(buttonEl, mouseDownEvents, mouseDownHandler);
}


/**
 * MouseDown Event handler.
 * @param {Event} ev - The DOM event
 */
function mouseDownHandler(ev) {
  // only left clicks
  if (ev.type === 'mousedown' && ev.button !== 0) return;

  var buttonEl = this,
      rippleEl = buttonEl._rippleEl;

  // exit if button is disabled
  if (buttonEl.disabled) return;

  // add mouseup handler on first-click
  if (!rippleEl._init) {
    jqLite.on(buttonEl, mouseUpEvents, mouseUpHandler);
    rippleEl._init = true;
  }

  // get ripple element offset values and (x, y) position of click
  var offset = jqLite.offset(buttonEl),
      clickEv = (ev.type === 'touchstart') ? ev.touches[0] : ev,
      xPos = Math.round(clickEv.pageX - offset.left),
      yPos = Math.round(clickEv.pageY - offset.top),
      diameter;

  // calculate diameter
  diameter = Math.sqrt(offset.height * offset.height + 
                       offset.width * offset.width) * 2 + 2 + 'px';

  // css transform
  var tEnd = 'translate(-50%, -50%) translate(' + xPos + 'px,' + yPos + 'px)',
      tStart = tEnd + ' scale(0.0001, 0.0001)';

  // set position and initial scale
  jqLite.css(rippleEl, {
    width: diameter,
    height: diameter,
    webkitTransform: tStart,
    msTransform: tStart,
    transform: tStart
  });

  jqLite.addClass(rippleEl, 'mui--is-visible');
  jqLite.removeClass(rippleEl, 'mui--is-animating');

  // start animation
  util.requestAnimationFrame(function() {
    jqLite.css(rippleEl, {
      webkitTransform: tEnd,
      msTransform: tEnd,
      transform: tEnd
    });
    
    jqLite.addClass(rippleEl, 'mui--is-animating');
  });
}


/**
 * MouseUp event handler.
 * @param {Event} ev - The DOM event
 */
function mouseUpHandler(ev) {
  // get ripple element
  var rippleEl = this._rippleEl;

  // allow a repaint to occur before removing class so animation shows for
  // tap events
  util.requestAnimationFrame(function() {
    jqLite.removeClass(rippleEl, 'mui--is-visible');
  });
}


/** Define module API */
module.exports = {
  /** Initialize module listeners */
  initListeners: function() {
    // markup elements available when method is called
    var elList = document.getElementsByClassName('mui-btn'),
        i = elList.length;
    while (i--) initialize(elList[i]);

    // listen for new elements
    animationHelpers.onAnimationStart('mui-btn-inserted', function(ev) {
      initialize(ev.target);
    });
  }
};
