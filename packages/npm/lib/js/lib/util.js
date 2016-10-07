/**
 * MUI CSS/JS utilities module
 * @module lib/util
 */

'use strict';


var config = require('../config'),
    jqLite = require('./jqLite'),
    scrollLock = 0,
    scrollLockCls = 'mui-scroll-lock',
    scrollStyleEl,
    scrollEventHandler,
    _supportsPointerEvents;


scrollEventHandler = function(ev) {
  // stop propagation on window scroll events
  if (!ev.target.tagName) ev.stopImmediatePropagation();
}


/**
 * Logging function
 */
function logFn() {
  var win = window;
  
  if (config.debug && typeof win.console !== "undefined") {
    try {
      win.console.log.apply(win.console, arguments);
    } catch (a) {
      var e = Array.prototype.slice.call(arguments);
      win.console.log(e.join("\n"));
    }
  }
}


/**
 * Load CSS text in new stylesheet
 * @param {string} cssText - The css text.
 */
function loadStyleFn(cssText) {
  var doc = document,
      head;
  
  // copied from jQuery 
  head = doc.head ||
    doc.getElementsByTagName('head')[0] ||
    doc.documentElement;
  
  var e = doc.createElement('style');
  e.type = 'text/css';
  
  if (e.styleSheet) e.styleSheet.cssText = cssText;
  else e.appendChild(doc.createTextNode(cssText));
  
  // add to document
  head.insertBefore(e, head.firstChild);
  
  return e;
}


/**
 * Raise an error
 * @param {string} msg - The error message.
 */
function raiseErrorFn(msg, useConsole) {
  if (useConsole) {
    if (typeof console !== 'undefined') console.error('MUI Warning: ' + msg);
  } else {
    throw new Error('MUI: ' + msg);
  }
}


/**
 * Convert Classname object, with class as key and true/false as value, to an
 * class string.
 * @param  {Object} classes The classes
 * @return {String}         class string
 */
function classNamesFn(classes) {
  var cs = '';
  for (var i in classes) {
    cs += (classes[i]) ? i + ' ' : '';
  }
  return cs.trim();
}


/**
 * Check if client supports pointer events.
 */
function supportsPointerEventsFn() {
  // check cache
  if (_supportsPointerEvents !== undefined) return _supportsPointerEvents;
  
  var element = document.createElement('x');
  element.style.cssText = 'pointer-events:auto';
  _supportsPointerEvents = (element.style.pointerEvents === 'auto');
  return _supportsPointerEvents;
}


/**
 * Create callback closure.
 * @param {Object} instance - The object instance.
 * @param {String} funcName - The name of the callback function.
 */
function callbackFn(instance, funcName) {
  return function() {instance[funcName].apply(instance, arguments);};
}


/**
 * Dispatch event.
 * @param {Element} element - The DOM element.
 * @param {String} eventType - The event type.
 * @param {Boolean} bubbles=true - If true, event bubbles.
 * @param {Boolean} cancelable=true = If true, event is cancelable
 * @param {Object} [data] - Data to add to event object
 */
function dispatchEventFn(element, eventType, bubbles, cancelable, data) {
  var ev = document.createEvent('HTMLEvents'),
      bubbles = (bubbles !== undefined) ? bubbles : true,
       cancelable = (cancelable !== undefined) ? cancelable : true,
       k;

  ev.initEvent(eventType, bubbles, cancelable);
  
  // add data to event object
  if (data) for (k in data) ev[k] = data[k];
  
  // dispatch
  if (element) element.dispatchEvent(ev);
  
  return ev;
}


/**
 * Turn on window scroll lock.
 */
function enableScrollLockFn() {
  // increment counter
  scrollLock += 1;
  
  // add lock
  if (scrollLock === 1) {
    var htmlEl = document.documentElement,
        top = jqLite.scrollTop(window),
        left = jqLite.scrollLeft(window),
        cssProps,
        cssStr;

    // define scroll lock class dynamically
    cssProps = [
      'position:fixed',
      'top:' + -top + 'px',
      'right:0',
      'bottom:0',
      'left:' + -left + 'px'
    ];

    // scrollbar-y
    if (htmlEl.scrollHeight > htmlEl.clientHeight) {
      cssProps.push('overflow-y:scroll');
    }
    
    // scrollbar-x
    if (htmlEl.scrollWidth > htmlEl.clientWidth) {
      cssProps.push('overflow-x:scroll');
    }

    // define css class dynamically
    cssStr = '.' + scrollLockCls + '{';
    cssStr += cssProps.join(' !important;') + ' !important;}';
    scrollStyleEl = loadStyleFn(cssStr);

    // cancel 'scroll' event listener callbacks
    jqLite.on(window, 'scroll', scrollEventHandler, true);

    // add scroll lock
    jqLite.addClass(htmlEl, scrollLockCls);
  }
}


/**
 * Turn off window scroll lock.
 * @param {Boolean} resetPos - Reset scroll position to original value.
 */
function disableScrollLockFn(resetPos) {
  // ignore
  if (scrollLock === 0) return;

  // decrement counter
  scrollLock -= 1;

  // remove lock 
  if (scrollLock === 0) {
    var htmlEl = document.documentElement,
        top = parseInt(jqLite.css(htmlEl, 'top')),
        left = parseInt(jqLite.css(htmlEl, 'left'));

    // remove scroll lock and delete style element
    jqLite.removeClass(htmlEl, scrollLockCls);
    scrollStyleEl.parentNode.removeChild(scrollStyleEl);

    // restore scroll position
    window.scrollTo(-left, -top);      

    // restore scroll event listeners
    jqLite.off(window, 'scroll', scrollEventHandler, true);
  }
}

/**
 * requestAnimationFrame polyfilled
 * @param {Function} callback - The callback function
 */
function requestAnimationFrameFn(callback) {
  var fn = window.requestAnimationFrame;
  if (fn) fn(callback);
  else setTimeout(callback, 0);
}


/**
 * Define the module API
 */
module.exports = {
  /** Create callback closures */
  callback: callbackFn,
  
  /** Classnames object to string */
  classNames: classNamesFn,

  /** Disable scroll lock */
  disableScrollLock: disableScrollLockFn,

  /** Dispatch event */
  dispatchEvent: dispatchEventFn,
  
  /** Enable scroll lock */
  enableScrollLock: enableScrollLockFn,

  /** Log messages to the console when debug is turned on */
  log: logFn,

  /** Load CSS text as new stylesheet */
  loadStyle: loadStyleFn,

  /** Raise MUI error */
  raiseError: raiseErrorFn,

  /** Request animation frame */
  requestAnimationFrame: requestAnimationFrameFn,

  /** Support Pointer Events check */
  supportsPointerEvents: supportsPointerEventsFn
};
