/**
 * MUI CSS/JS ripple module
 * @module ripple
 */

'use strict';


var jqLite = require('./lib/jqLite'),
    util = require('./lib/util'),
    btnClass = 'mui-btn',
    btnFABClass = 'mui-btn--fab',
    rippleClass = 'mui-ripple-effect',
    supportsTouch = 'ontouchstart' in document.documentElement,
    mouseDownEvents = (supportsTouch) ? 'touchstart' : 'mousedown',
    mouseUpEvents = (supportsTouch) ? 'touchend' : 'mouseup mouseleave',
    animationDuration = 600;


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

  var buttonEl = this;

  // exit if button is disabled
  if (buttonEl.disabled === true) return;

  // add mouseup event to button once
  if (!buttonEl.muiMouseUp) {
    jqLite.on(buttonEl, mouseUpEvents, mouseUpHandler);
    buttonEl.muiMouseUp = true;
  }

  // create ripple element
  var rippleEl = createRippleEl(ev, buttonEl);

  buttonEl.appendChild(rippleEl);

  // animate in
  util.requestAnimationFrame(function() {
    jqLite.addClass(rippleEl, 'mui--animate-in mui--active');
  });
}


/**
 * MouseUp event handler.
 * @param {Event} ev - The DOM event
 */
function mouseUpHandler(ev) {
  var children = this.children,
      i = children.length,
      rippleEls = [],
      el;

  // animate out ripples
  while (i--) {
    el = children[i];
    if (jqLite.hasClass(el, rippleClass)) {
      jqLite.addClass(el, 'mui--animate-out');
      rippleEls.push(el);
    }
  }

  // remove ripples after animation
  if (rippleEls.length) {
    setTimeout(function() {
      var i = rippleEls.length,
          el,
          parentNode;

      // remove elements
      while (i--) {
        el = rippleEls[i];
        parentNode = el.parentNode;
        if (parentNode) parentNode.removeChild(el);
      }
    }, animationDuration);
  }
}


/**
 * Create ripple element  
 * @param {Element} - buttonEl - The button element.
 */
function createRippleEl(ev, buttonEl) {
  // get (x, y) position of click
  var offset = jqLite.offset(buttonEl),
      clickEv = (ev.type === 'touchstart') ? ev.touches[0] : ev,
      xPos = clickEv.pageX - offset.left,
      yPos = clickEv.pageY - offset.top,
      diameter,
      radius,
      rippleEl;

  // calculate diameter
  diameter = Math.sqrt(offset.width * offset.width + 
                       offset.height * offset.height) * 2;

  // create element
  rippleEl = document.createElement('div'),
  rippleEl.className = rippleClass;

  radius = diameter / 2;

  jqLite.css(rippleEl, {
    height: diameter + 'px',
    width: diameter + 'px',
    top: yPos - radius + 'px',
    left: xPos - radius + 'px'
  });

  return rippleEl;
}


/** Define module API */
module.exports = {
  /** Initialize module listeners */
  initListeners: function() {
    var doc = document;

    // markup elements available when method is called
    var elList = doc.getElementsByClassName(btnClass);
    for (var i=elList.length - 1; i >= 0; i--) initialize(elList[i]);

    // listen for new elements
    util.onNodeInserted(function(el) {
      if (jqLite.hasClass(el, btnClass)) initialize(el);
    });
  }
};
