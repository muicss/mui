(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

/**
 * MUI config module
 * @module config
 */

/** Define module API */
module.exports = {
  /** Use debug mode */
  debug: true
};

},{}],2:[function(require,module,exports){
/**
 * MUI CSS/JS form helpers module
 * @module lib/forms.py
 */

'use strict';

var wrapperPadding = 15,
    // from CSS
inputHeight = 32,
    // from CSS
optionHeight = 42,
    // from CSS
menuPadding = 8; // from CSS

/**
 * Menu position/size/scroll helper
 * @returns {Object} Object with keys 'height', 'top', 'scrollTop'
 */
function getMenuPositionalCSSFn(wrapperEl, numOptions, currentIndex) {
  var viewHeight = document.documentElement.clientHeight;

  // determine 'height'
  var h = numOptions * optionHeight + 2 * menuPadding,
      height = Math.min(h, viewHeight);

  // determine 'top'
  var top, initTop, minTop, maxTop;

  initTop = menuPadding + optionHeight - (wrapperPadding + inputHeight);
  initTop -= currentIndex * optionHeight;

  minTop = -1 * wrapperEl.getBoundingClientRect().top;
  maxTop = viewHeight - height + minTop;

  top = Math.min(Math.max(initTop, minTop), maxTop);

  // determine 'scrollTop'
  var scrollTop = 0,
      scrollIdeal,
      scrollMax;

  if (h > viewHeight) {
    scrollIdeal = menuPadding + (currentIndex + 1) * optionHeight - (-1 * top + wrapperPadding + inputHeight);
    scrollMax = numOptions * optionHeight + 2 * menuPadding - height;
    scrollTop = Math.min(scrollIdeal, scrollMax);
  }

  return {
    'height': height + 'px',
    'top': top + 'px',
    'scrollTop': scrollTop
  };
}

/** Define module API */
module.exports = {
  getMenuPositionalCSS: getMenuPositionalCSSFn
};

},{}],3:[function(require,module,exports){
/**
 * MUI CSS/JS jqLite module
 * @module lib/jqLite
 */

'use strict';

// Global vars

var gDoc = document,
    gDocEl = gDoc.documentElement,
    gWin = window;

/**
 * Add a class to an element.
 * @param {Element} element - The DOM element.
 * @param {string} cssClasses - Space separated list of class names.
 */
function jqLiteAddClass(element, cssClasses) {
  if (!cssClasses || !element.setAttribute) return;

  var existingClasses = _getExistingClasses(element),
      splitClasses = cssClasses.split(' '),
      cssClass;

  for (var i = 0; i < splitClasses.length; i++) {
    cssClass = splitClasses[i].trim();
    if (existingClasses.indexOf(' ' + cssClass + ' ') === -1) {
      existingClasses += cssClass + ' ';
    }
  }

  element.setAttribute('class', existingClasses.trim());
}

/**
 * Get or set CSS properties.
 * @param {Element} element - The DOM element.
 * @param {string} [name] - The property name.
 * @param {string} [value] - The property value.
 */
function jqLiteCss(element, name, value) {
  // Return full style object
  if (name === undefined) {
    return getComputedStyle(element);
  }

  var nameType = jqLiteType(name);

  // Set multiple values
  if (nameType === 'object') {
    for (var key in name) {
      element.style[_camelCase(key)] = name[key];
    }return;
  }

  // Set a single value
  if (nameType === 'string' && value !== undefined) {
    element.style[_camelCase(name)] = value;
  }

  var styleObj = getComputedStyle(element),
      isArray = jqLiteType(name) === 'array';

  // Read single value
  if (!isArray) return _getCurrCssProp(element, name, styleObj);

  // Read multiple values
  var outObj = {},
      key;

  for (var i = 0; i < name.length; i++) {
    key = name[i];
    outObj[key] = _getCurrCssProp(element, key, styleObj);
  }

  return outObj;
}

/**
 * Check if element has class.
 * @param {Element} element - The DOM element.
 * @param {string} cls - The class name string.
 */
function jqLiteHasClass(element, cls) {
  if (!cls || !element.getAttribute) return false;
  return _getExistingClasses(element).indexOf(' ' + cls + ' ') > -1;
}

/**
 * Return the type of a variable.
 * @param {} somevar - The JavaScript variable.
 */
function jqLiteType(somevar) {
  // handle undefined
  if (somevar === undefined) return 'undefined';

  // handle others (of type [object <Type>])
  var typeStr = Object.prototype.toString.call(somevar);
  if (typeStr.indexOf('[object ') === 0) {
    return typeStr.slice(8, -1).toLowerCase();
  } else {
    throw new Error("MUI: Could not understand type: " + typeStr);
  }
}

/**
 * Attach an event handler to a DOM element
 * @param {Element} element - The DOM element.
 * @param {string} type - The event type name.
 * @param {Function} callback - The callback function.
 * @param {Boolean} useCapture - Use capture flag.
 */
function jqLiteOn(element, type, callback, useCapture) {
  useCapture = useCapture === undefined ? false : useCapture;

  // add to DOM
  element.addEventListener(type, callback, useCapture);

  // add to cache
  var cache = element._muiEventCache = element._muiEventCache || {};
  cache[type] = cache[type] || [];
  cache[type].push([callback, useCapture]);
}

/**
 * Remove an event handler from a DOM element
 * @param {Element} element - The DOM element.
 * @param {string} type - The event type name.
 * @param {Function} callback - The callback function.
 * @param {Boolean} useCapture - Use capture flag.
 */
function jqLiteOff(element, type, callback, useCapture) {
  useCapture = useCapture === undefined ? false : useCapture;

  // remove from cache
  var cache = element._muiEventCache = element._muiEventCache || {},
      argsList = cache[type] || [],
      args,
      i;

  i = argsList.length;
  while (i--) {
    args = argsList[i];

    // remove all events if callback is undefined
    if (callback === undefined || args[0] === callback && args[1] === useCapture) {

      // remove from cache
      argsList.splice(i, 1);

      // remove from DOM
      element.removeEventListener(type, args[0], args[1]);
    }
  }
}

/**
 * Attach an event hander which will only execute once
 * @param {Element} element - The DOM element.
 * @param {string} type - The event type name.
 * @param {Function} callback - The callback function.
 * @param {Boolean} useCapture - Use capture flag.
 */
function jqLiteOne(element, type, callback, useCapture) {
  jqLiteOn(element, type, function onFn(ev) {
    // execute callback
    if (callback) callback.apply(this, arguments);

    // remove wrapper
    jqLiteOff(element, type, onFn);
  }, useCapture);
}

/**
 * Get or set horizontal scroll position
 * @param {Element} element - The DOM element
 * @param {number} [value] - The scroll position
 */
function jqLiteScrollLeft(element, value) {
  // get
  if (value === undefined) {
    if (element === gWin) {
      var t = gWin.pageXOffset || gDocEl.scrollLeft;
      return t - (gDocEl.clientLeft || 0);
    } else {
      return element.scrollLeft;
    }
  }

  // set
  if (element === gWin) gWin.scrollTo(value, jqLiteScrollTop(gWin));else element.scrollLeft = value;
}

/**
 * Get or set vertical scroll position
 * @param {Element} element - The DOM element
 * @param {number} value - The scroll position
 */
function jqLiteScrollTop(element, value) {
  // get
  if (value === undefined) {
    if (element === gWin) {
      return (gWin.pageYOffset || gDocEl.scrollTop) - (gDocEl.clientTop || 0);
    } else {
      return element.scrollTop;
    }
  }

  // set
  if (element === gWin) gWin.scrollTo(jqLiteScrollLeft(gWin), value);else element.scrollTop = value;
}

/**
 * Return object representing top/left offset and element height/width.
 * @param {Element} element - The DOM element.
 */
function jqLiteOffset(element) {
  var rect = element.getBoundingClientRect(),
      scrollTop = jqLiteScrollTop(gWin),
      scrollLeft = jqLiteScrollLeft(gWin);

  return {
    top: rect.top + scrollTop,
    left: rect.left + scrollLeft,
    height: rect.height,
    width: rect.width
  };
}

/**
 * Attach a callback to the DOM ready event listener
 * @param {Function} fn - The callback function.
 */
function jqLiteReady(fn) {
  var done = false,
      top = true,
      doc = document,
      win = doc.defaultView,
      root = doc.documentElement,
      add = doc.addEventListener ? 'addEventListener' : 'attachEvent',
      rem = doc.addEventListener ? 'removeEventListener' : 'detachEvent',
      pre = doc.addEventListener ? '' : 'on';

  var init = function init(e) {
    if (e.type == 'readystatechange' && doc.readyState != 'complete') {
      return;
    }

    (e.type == 'load' ? win : doc)[rem](pre + e.type, init, false);
    if (!done && (done = true)) fn.call(win, e.type || e);
  };

  var poll = function poll() {
    try {
      root.doScroll('left');
    } catch (e) {
      setTimeout(poll, 50);return;
    }
    init('poll');
  };

  if (doc.readyState == 'complete') {
    fn.call(win, 'lazy');
  } else {
    if (doc.createEventObject && root.doScroll) {
      try {
        top = !win.frameElement;
      } catch (e) {}
      if (top) poll();
    }
    doc[add](pre + 'DOMContentLoaded', init, false);
    doc[add](pre + 'readystatechange', init, false);
    win[add](pre + 'load', init, false);
  }
}

/**
 * Remove classes from a DOM element
 * @param {Element} element - The DOM element.
 * @param {string} cssClasses - Space separated list of class names.
 */
function jqLiteRemoveClass(element, cssClasses) {
  if (!cssClasses || !element.setAttribute) return;

  var existingClasses = _getExistingClasses(element),
      splitClasses = cssClasses.split(' '),
      cssClass;

  for (var i = 0; i < splitClasses.length; i++) {
    cssClass = splitClasses[i].trim();
    while (existingClasses.indexOf(' ' + cssClass + ' ') >= 0) {
      existingClasses = existingClasses.replace(' ' + cssClass + ' ', ' ');
    }
  }

  element.setAttribute('class', existingClasses.trim());
}

// ------------------------------
// Utilities
// ------------------------------
var SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g,
    MOZ_HACK_REGEXP = /^moz([A-Z])/,
    ESCAPE_REGEXP = /([.*+?^=!:${}()|\[\]\/\\])/g,
    BOOLEAN_ATTRS;

BOOLEAN_ATTRS = {
  multiple: true,
  selected: true,
  checked: true,
  disabled: true,
  readonly: true,
  required: true,
  open: true
};

function _getExistingClasses(element) {
  var classes = (element.getAttribute('class') || '').replace(/[\n\t]/g, '');
  return ' ' + classes + ' ';
}

function _camelCase(name) {
  return name.replace(SPECIAL_CHARS_REGEXP, function (_, separator, letter, offset) {
    return offset ? letter.toUpperCase() : letter;
  }).replace(MOZ_HACK_REGEXP, 'Moz$1');
}

function _escapeRegExp(string) {
  return string.replace(ESCAPE_REGEXP, "\\$1");
}

function _getCurrCssProp(elem, name, computed) {
  var ret;

  // try computed style
  ret = computed.getPropertyValue(name);

  // try style attribute (if element is not attached to document)
  if (ret === '' && !elem.ownerDocument) ret = elem.style[_camelCase(name)];

  return ret;
}

/**
 * Module API
 */
module.exports = {
  /** Add classes */
  addClass: jqLiteAddClass,

  /** Get or set CSS properties */
  css: jqLiteCss,

  /** Check for class */
  hasClass: jqLiteHasClass,

  /** Remove event handlers */
  off: jqLiteOff,

  /** Return offset values */
  offset: jqLiteOffset,

  /** Add event handlers */
  on: jqLiteOn,

  /** Add an execute-once event handler */
  one: jqLiteOne,

  /** DOM ready event handler */
  ready: jqLiteReady,

  /** Remove classes */
  removeClass: jqLiteRemoveClass,

  /** Check JavaScript variable instance type */
  type: jqLiteType,

  /** Get or set horizontal scroll position */
  scrollLeft: jqLiteScrollLeft,

  /** Get or set vertical scroll position */
  scrollTop: jqLiteScrollTop
};

},{}],4:[function(require,module,exports){
/**
 * MUI CSS/JS jqLite module
 * @module lib/jqLite
 */

'use strict';

// Global vars

var gDoc = document,
    gDocEl = gDoc.documentElement,
    gWin = window;

/**
 * Add a class to an element.
 * @param {Element} element - The DOM element.
 * @param {string} cssClasses - Space separated list of class names.
 */
function jqLiteAddClass(element, cssClasses) {
  if (!cssClasses || !element.setAttribute) return;

  var existingClasses = _getExistingClasses(element),
      splitClasses = cssClasses.split(' '),
      cssClass;

  for (var i = 0; i < splitClasses.length; i++) {
    cssClass = splitClasses[i].trim();
    if (existingClasses.indexOf(' ' + cssClass + ' ') === -1) {
      existingClasses += cssClass + ' ';
    }
  }

  element.setAttribute('class', existingClasses.trim());
}

/**
 * Get or set CSS properties.
 * @param {Element} element - The DOM element.
 * @param {string} [name] - The property name.
 * @param {string} [value] - The property value.
 */
function jqLiteCss(element, name, value) {
  // Return full style object
  if (name === undefined) {
    return getComputedStyle(element);
  }

  var nameType = jqLiteType(name);

  // Set multiple values
  if (nameType === 'object') {
    for (var key in name) {
      element.style[_camelCase(key)] = name[key];
    }return;
  }

  // Set a single value
  if (nameType === 'string' && value !== undefined) {
    element.style[_camelCase(name)] = value;
  }

  var styleObj = getComputedStyle(element),
      isArray = jqLiteType(name) === 'array';

  // Read single value
  if (!isArray) return _getCurrCssProp(element, name, styleObj);

  // Read multiple values
  var outObj = {},
      key;

  for (var i = 0; i < name.length; i++) {
    key = name[i];
    outObj[key] = _getCurrCssProp(element, key, styleObj);
  }

  return outObj;
}

/**
 * Check if element has class.
 * @param {Element} element - The DOM element.
 * @param {string} cls - The class name string.
 */
function jqLiteHasClass(element, cls) {
  if (!cls || !element.getAttribute) return false;
  return _getExistingClasses(element).indexOf(' ' + cls + ' ') > -1;
}

/**
 * Return the type of a variable.
 * @param {} somevar - The JavaScript variable.
 */
function jqLiteType(somevar) {
  // handle undefined
  if (somevar === undefined) return 'undefined';

  // handle others (of type [object <Type>])
  var typeStr = Object.prototype.toString.call(somevar);
  if (typeStr.indexOf('[object ') === 0) {
    return typeStr.slice(8, -1).toLowerCase();
  } else {
    throw new Error("MUI: Could not understand type: " + typeStr);
  }
}

/**
 * Attach an event handler to a DOM element
 * @param {Element} element - The DOM element.
 * @param {string} type - The event type name.
 * @param {Function} callback - The callback function.
 * @param {Boolean} useCapture - Use capture flag.
 */
function jqLiteOn(element, type, callback, useCapture) {
  useCapture = useCapture === undefined ? false : useCapture;

  // add to DOM
  element.addEventListener(type, callback, useCapture);

  // add to cache
  var cache = element._muiEventCache = element._muiEventCache || {};
  cache[type] = cache[type] || [];
  cache[type].push([callback, useCapture]);
}

/**
 * Remove an event handler from a DOM element
 * @param {Element} element - The DOM element.
 * @param {string} type - The event type name.
 * @param {Function} callback - The callback function.
 * @param {Boolean} useCapture - Use capture flag.
 */
function jqLiteOff(element, type, callback, useCapture) {
  useCapture = useCapture === undefined ? false : useCapture;

  // remove from cache
  var cache = element._muiEventCache = element._muiEventCache || {},
      argsList = cache[type] || [],
      args,
      i;

  i = argsList.length;
  while (i--) {
    args = argsList[i];

    // remove all events if callback is undefined
    if (callback === undefined || args[0] === callback && args[1] === useCapture) {

      // remove from cache
      argsList.splice(i, 1);

      // remove from DOM
      element.removeEventListener(type, args[0], args[1]);
    }
  }
}

/**
 * Attach an event hander which will only execute once
 * @param {Element} element - The DOM element.
 * @param {string} type - The event type name.
 * @param {Function} callback - The callback function.
 * @param {Boolean} useCapture - Use capture flag.
 */
function jqLiteOne(element, type, callback, useCapture) {
  jqLiteOn(element, type, function onFn(ev) {
    // execute callback
    if (callback) callback.apply(this, arguments);

    // remove wrapper
    jqLiteOff(element, type, onFn);
  }, useCapture);
}

/**
 * Get or set horizontal scroll position
 * @param {Element} element - The DOM element
 * @param {number} [value] - The scroll position
 */
function jqLiteScrollLeft(element, value) {
  // get
  if (value === undefined) {
    if (element === gWin) {
      var t = gWin.pageXOffset || gDocEl.scrollLeft;
      return t - (gDocEl.clientLeft || 0);
    } else {
      return element.scrollLeft;
    }
  }

  // set
  if (element === gWin) gWin.scrollTo(value, jqLiteScrollTop(gWin));else element.scrollLeft = value;
}

/**
 * Get or set vertical scroll position
 * @param {Element} element - The DOM element
 * @param {number} value - The scroll position
 */
function jqLiteScrollTop(element, value) {
  // get
  if (value === undefined) {
    if (element === gWin) {
      return (gWin.pageYOffset || gDocEl.scrollTop) - (gDocEl.clientTop || 0);
    } else {
      return element.scrollTop;
    }
  }

  // set
  if (element === gWin) gWin.scrollTo(jqLiteScrollLeft(gWin), value);else element.scrollTop = value;
}

/**
 * Return object representing top/left offset and element height/width.
 * @param {Element} element - The DOM element.
 */
function jqLiteOffset(element) {
  var rect = element.getBoundingClientRect(),
      scrollTop = jqLiteScrollTop(gWin),
      scrollLeft = jqLiteScrollLeft(gWin);

  return {
    top: rect.top + scrollTop,
    left: rect.left + scrollLeft,
    height: rect.height,
    width: rect.width
  };
}

/**
 * Attach a callback to the DOM ready event listener
 * @param {Function} fn - The callback function.
 */
function jqLiteReady(fn) {
  var done = false,
      top = true,
      doc = document,
      win = doc.defaultView,
      root = doc.documentElement,
      add = doc.addEventListener ? 'addEventListener' : 'attachEvent',
      rem = doc.addEventListener ? 'removeEventListener' : 'detachEvent',
      pre = doc.addEventListener ? '' : 'on';

  var init = function init(e) {
    if (e.type == 'readystatechange' && doc.readyState != 'complete') {
      return;
    }

    (e.type == 'load' ? win : doc)[rem](pre + e.type, init, false);
    if (!done && (done = true)) fn.call(win, e.type || e);
  };

  var poll = function poll() {
    try {
      root.doScroll('left');
    } catch (e) {
      setTimeout(poll, 50);return;
    }
    init('poll');
  };

  if (doc.readyState == 'complete') {
    fn.call(win, 'lazy');
  } else {
    if (doc.createEventObject && root.doScroll) {
      try {
        top = !win.frameElement;
      } catch (e) {}
      if (top) poll();
    }
    doc[add](pre + 'DOMContentLoaded', init, false);
    doc[add](pre + 'readystatechange', init, false);
    win[add](pre + 'load', init, false);
  }
}

/**
 * Remove classes from a DOM element
 * @param {Element} element - The DOM element.
 * @param {string} cssClasses - Space separated list of class names.
 */
function jqLiteRemoveClass(element, cssClasses) {
  if (!cssClasses || !element.setAttribute) return;

  var existingClasses = _getExistingClasses(element),
      splitClasses = cssClasses.split(' '),
      cssClass;

  for (var i = 0; i < splitClasses.length; i++) {
    cssClass = splitClasses[i].trim();
    while (existingClasses.indexOf(' ' + cssClass + ' ') >= 0) {
      existingClasses = existingClasses.replace(' ' + cssClass + ' ', ' ');
    }
  }

  element.setAttribute('class', existingClasses.trim());
}

// ------------------------------
// Utilities
// ------------------------------
var SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g,
    MOZ_HACK_REGEXP = /^moz([A-Z])/,
    ESCAPE_REGEXP = /([.*+?^=!:${}()|\[\]\/\\])/g,
    BOOLEAN_ATTRS;

BOOLEAN_ATTRS = {
  multiple: true,
  selected: true,
  checked: true,
  disabled: true,
  readonly: true,
  required: true,
  open: true
};

function _getExistingClasses(element) {
  var classes = (element.getAttribute('class') || '').replace(/[\n\t]/g, '');
  return ' ' + classes + ' ';
}

function _camelCase(name) {
  return name.replace(SPECIAL_CHARS_REGEXP, function (_, separator, letter, offset) {
    return offset ? letter.toUpperCase() : letter;
  }).replace(MOZ_HACK_REGEXP, 'Moz$1');
}

function _escapeRegExp(string) {
  return string.replace(ESCAPE_REGEXP, "\\$1");
}

function _getCurrCssProp(elem, name, computed) {
  var ret;

  // try computed style
  ret = computed.getPropertyValue(name);

  // try style attribute (if element is not attached to document)
  if (ret === '' && !elem.ownerDocument) ret = elem.style[_camelCase(name)];

  return ret;
}

/**
 * Module API
 */
module.exports = {
  /** Add classes */
  addClass: jqLiteAddClass,

  /** Get or set CSS properties */
  css: jqLiteCss,

  /** Check for class */
  hasClass: jqLiteHasClass,

  /** Remove event handlers */
  off: jqLiteOff,

  /** Return offset values */
  offset: jqLiteOffset,

  /** Add event handlers */
  on: jqLiteOn,

  /** Add an execute-once event handler */
  one: jqLiteOne,

  /** DOM ready event handler */
  ready: jqLiteReady,

  /** Remove classes */
  removeClass: jqLiteRemoveClass,

  /** Check JavaScript variable instance type */
  type: jqLiteType,

  /** Get or set horizontal scroll position */
  scrollLeft: jqLiteScrollLeft,

  /** Get or set vertical scroll position */
  scrollTop: jqLiteScrollTop
};

},{}],5:[function(require,module,exports){
/**
 * MUI CSS/JS utilities module
 * @module lib/util
 */

'use strict';

var config = require('../config.js'),
    jqLite = require('./jqLite.js'),
    win = window,
    doc = document,
    nodeInsertedCallbacks = [],
    scrollLock = 0,
    scrollLockCls = 'mui-body--scroll-lock',
    scrollLockPos,
    head,
    _supportsPointerEvents;

head = doc.head || doc.getElementsByTagName('head')[0] || doc.documentElement;

/**
 * Logging function
 */
function logFn() {
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
  var e = doc.createElement('style');
  e.type = 'text/css';

  if (e.styleSheet) e.styleSheet.cssText = cssText;else e.appendChild(doc.createTextNode(cssText));

  // add to document
  head.insertBefore(e, head.firstChild);

  return e;
}

/**
 * Raise an error
 * @param {string} msg - The error message.
 */
function raiseErrorFn(msg) {
  throw new Error("MUI: " + msg);
}

/**
 * Register callbacks on muiNodeInserted event
 * @param {function} callbackFn - The callback function.
 */
function onNodeInsertedFn(callbackFn) {
  nodeInsertedCallbacks.push(callbackFn);

  // initalize listeners
  if (nodeInsertedCallbacks._initialized === undefined) {
    jqLite.on(doc, 'animationstart', animationHandlerFn);
    jqLite.on(doc, 'mozAnimationStart', animationHandlerFn);
    jqLite.on(doc, 'webkitAnimationStart', animationHandlerFn);

    nodeInsertedCallbacks._initialized = true;
  }
}

/**
 * Execute muiNodeInserted callbacks
 * @param {Event} ev - The DOM event.
 */
function animationHandlerFn(ev) {
  // check animation name
  if (ev.animationName !== 'mui-node-inserted') return;

  var el = ev.target;

  // iterate through callbacks
  for (var i = nodeInsertedCallbacks.length - 1; i >= 0; i--) {
    nodeInsertedCallbacks[i](el);
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
    cs += classes[i] ? i + ' ' : '';
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
  _supportsPointerEvents = element.style.pointerEvents === 'auto';
  return _supportsPointerEvents;
}

/**
 * Create callback closure.
 * @param {Object} instance - The object instance.
 * @param {String} funcName - The name of the callback function.
 */
function callbackFn(instance, funcName) {
  return function () {
    instance[funcName].apply(instance, arguments);
  };
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
      bubbles = bubbles !== undefined ? bubbles : true,
      cancelable = cancelable !== undefined ? cancelable : true,
      k;

  ev.initEvent(eventType, bubbles, cancelable);

  // add data to event object
  if (data) for (k in data) {
    ev[k] = data[k];
  } // dispatch
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
    scrollLockPos = { left: jqLite.scrollLeft(win), top: jqLite.scrollTop(win) };
    jqLite.addClass(doc.body, scrollLockCls);
    win.scrollTo(scrollLockPos.left, scrollLockPos.top);
  }
}

/**
 * Turn off window scroll lock.
 */
function disableScrollLockFn() {
  // ignore
  if (scrollLock === 0) return;

  // decrement counter
  scrollLock -= 1;

  // remove lock
  if (scrollLock === 0) {
    jqLite.removeClass(doc.body, scrollLockCls);
    win.scrollTo(scrollLockPos.left, scrollLockPos.top);
  }
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

  /** Register muiNodeInserted handler */
  onNodeInserted: onNodeInsertedFn,

  /** Raise MUI error */
  raiseError: raiseErrorFn,

  /** Support Pointer Events check */
  supportsPointerEvents: supportsPointerEventsFn
};

},{"../config.js":1,"./jqLite.js":3}],6:[function(require,module,exports){
/**
 * MUI React Appbar Module
 * @module react/appbar
 */

'use strict';

/**
 * Appbar constructor
 * @class
 */

var Appbar = React.createClass({
  displayName: "Appbar",

  render: function render() {
    return React.createElement(
      "div",
      { className: "mui-appbar" },
      this.props.children
    );
  }
});

/** Define module API */
module.exports = {
  Appbar: Appbar
};

},{}],7:[function(require,module,exports){
/**
 * MUI React button module
 * @module react/button
 */

'use strict';

var util = require('../js/lib/util.js'),
    Ripple = require('./ripple.jsx'),
    PropTypes = React.PropTypes;

var btnClass = 'mui-btn',
    btnAttrs = { color: 1, variant: 1, size: 1 };

/**
 * Button constructor
 * @class
 */
var Button = React.createClass({
  displayName: 'Button',

  mixins: [Ripple],
  propTypes: {
    color: PropTypes.oneOf(['default', 'primary', 'danger', 'dark', 'accent']),
    variant: PropTypes.oneOf(['default', 'flat', 'raised', 'fab']),
    size: PropTypes.oneOf(['default', 'small', 'large']),
    onClick: PropTypes.func,
    isDisabled: PropTypes.bool
  },
  getDefaultProps: function getDefaultProps() {
    return {
      color: 'default',
      variant: 'default',
      size: 'default',
      onClick: null,
      isDisabled: false
    };
  },
  render: function render() {
    var cls = btnClass,
        k,
        v;

    for (k in btnAttrs) {
      v = this.props[k];
      if (v !== 'default') cls += ' ' + btnClass + '--' + v;
    }

    return React.createElement(
      'button',
      {
        className: cls,
        disabled: this.props.isDisabled,
        onMouseDown: this.ripple,
        onTouchStart: this.ripple,
        onClick: this.props.onClick
      },
      this.props.children,
      this.state.ripples && this.renderRipples()
    );
  }
});

/** Define module API */
module.exports = {
  Button: Button
};

},{"../js/lib/util.js":5,"./ripple.jsx":20}],8:[function(require,module,exports){
/**
 * MUI React Caret Module
 * @module react/caret
 */

'use strict';

/**
 * Caret constructor
 * @class
 */

var Caret = React.createClass({
  displayName: "Caret",

  render: function render() {
    return React.createElement("span", { className: "mui-caret" });
  }
});

/** Define module API */
module.exports = {
  Caret: Caret
};

},{}],9:[function(require,module,exports){
/**
 * MUI React container module
 * @module react/container
 */

'use strict';

/**
 * Container constructor
 * @class
 */

var Container = React.createClass({
  displayName: 'Container',

  propTypes: {
    isFluid: React.PropTypes.bool
  },
  getDefaultProps: function getDefaultProps() {
    return {
      isFluid: false
    };
  },
  render: function render() {
    var cls = 'mui-container';

    // fluid containers
    if (this.props.isFluid) cls += '-fluid';

    return React.createElement(
      'div',
      { className: cls },
      this.props.children
    );
  }
});

/** Define module API */
module.exports = {
  Container: Container
};

},{}],10:[function(require,module,exports){
/**
 * MUI React divider module
 * @module react/divider
 */

'use strict';

/**
 * Divider constructor
 * @class
 */

var Divider = React.createClass({
  displayName: 'Divider',

  render: function render() {
    return React.createElement('div', { className: 'mui-divider' });
  }
});

/** Define module API */
module.exports = {
  Divider: Divider
};

},{}],11:[function(require,module,exports){
/**
 * MUI React dropdowns module
 * @module react/dropdowns
 */
/* jshint quotmark:false */
// jscs:disable validateQuoteMarks

'use strict';

var util = require('../js/lib/util'),
    jqLite = require('../js/lib/jqLite'),
    Button = require('./button.jsx').Button,
    Caret = require('./caret.jsx').Caret,
    PropTypes = React.PropTypes;

var dropdownClass = 'mui-dropdown',
    menuClass = 'mui-dropdown__menu',
    openClass = 'mui--is-open',
    rightClass = 'mui-dropdown__menu--right';

/**
 * Dropdown constructor
 * @class
 */
var Dropdown = React.createClass({
  displayName: 'Dropdown',

  propTypes: {
    color: Button.propTypes.color,
    variant: Button.propTypes.variant,
    size: Button.propTypes.size,
    label: PropTypes.string,
    alignMenu: PropTypes.oneOf(['left', 'right']),
    onClick: PropTypes.func,
    isDisabled: PropTypes.bool
  },
  getDefaultProps: function getDefaultProps() {
    return {
      color: 'default',
      variant: 'default',
      size: 'default',
      label: '',
      alignMenu: 'left',
      onClick: null,
      isDisabled: false
    };
  },
  getInitialState: function getInitialState() {
    return {
      opened: false,
      menuTop: 0
    };
  },
  componentWillMount: function componentWillMount() {
    document.addEventListener('click', this._outsideClick);
  },
  componentWillUnmount: function componentWillUnmount() {
    document.removeEventListener('click', this._outsideClick);
  },
  render: function render() {
    var button;

    button = React.createElement(
      Button,
      {
        ref: 'button',
        onClick: this._click,
        color: this.props.color,
        variant: this.props.variant,
        size: this.props.size,
        isDisabled: this.props.isDisabled
      },
      this.props.label,
      React.createElement(Caret, null)
    );

    var cs = {};

    cs[menuClass] = true;
    cs[openClass] = this.state.opened;
    cs[rightClass] = this.props.alignMenu === 'right';
    cs = util.classNames(cs);

    return React.createElement(
      'div',
      { className: dropdownClass },
      button,
      this.state.opened && React.createElement(
        'ul',
        {
          className: cs,
          style: { top: this.state.menuTop },
          onClick: this._select
        },
        this.props.children
      )
    );
  },
  _click: function _click(ev) {
    // only left clicks
    if (ev.button !== 0) return;

    // exit if toggle button is disabled
    if (this.props.isDisabled) return;

    setTimeout((function () {
      if (!ev.defaultPrevented) this._toggle();
    }).bind(this), 0);
  },
  _toggle: function _toggle() {
    // exit if no menu element
    if (!this.props.children) {
      return util.raiseError('Dropdown menu element not found');
    }

    if (this.state.opened) this._close();else this._open();
  },
  _open: function _open() {
    // position menu element below toggle button
    var wrapperRect = ReactDOM.findDOMNode(this).getBoundingClientRect(),
        toggleRect;

    toggleRect = ReactDOM.findDOMNode(this.refs.button).getBoundingClientRect();

    this.setState({
      opened: true,
      menuTop: toggleRect.top - wrapperRect.top + toggleRect.height
    });
  },
  _close: function _close() {
    this.setState({ opened: false });
  },
  _select: function _select(ev) {
    if (this.props.onClick) this.props.onClick(this, ev);
  },
  _outsideClick: function _outsideClick(ev) {
    var isClickInside = ReactDOM.findDOMNode(this).contains(ev.target);

    if (!isClickInside) this._close();
  }
});

/**
 * DropdownItem constructor
 * @class
 */
var DropdownItem = React.createClass({
  displayName: 'DropdownItem',

  propTypes: {
    link: PropTypes.string,
    onClick: PropTypes.func
  },
  getDefaultProps: function getDefaultProps() {
    return {
      link: null,
      onClick: null
    };
  },
  render: function render() {
    return React.createElement(
      'li',
      null,
      React.createElement(
        'a',
        { href: this.props.link, onClick: this._click },
        this.props.children
      )
    );
  },
  _click: function _click(ev) {
    if (this.props.onClick) this.props.onClick(this, ev);
  }
});

/** Define module API */
module.exports = {
  Dropdown: Dropdown,
  DropdownItem: DropdownItem
};

},{"../js/lib/jqLite":3,"../js/lib/util":5,"./button.jsx":7,"./caret.jsx":8}],12:[function(require,module,exports){
'use strict';

/**
 * MUI React main module
 * @module react/main
 */

(function (win) {
  // return if library has been loaded already
  if (win._muiReactLoaded) return;else win._muiReactLoaded = true;

  var lib;

  // appbar
  win.MUIAppbar = require('./appbar.jsx').Appbar;

  // buttons
  win.MUIButton = require('./button.jsx').Button;

  // caret
  win.MUICaret = require('./caret.jsx').Caret;

  // container
  win.MUIContainer = require('./container.jsx').Container;

  // dividers
  win.MUIDivider = require('./divider.jsx').Divider;

  // dropdowns
  lib = require('./dropdown.jsx');
  win.MUIDropdown = lib.Dropdown;
  win.MUIDropdownItem = lib.DropdownItem;

  // grid
  lib = require('./grid.jsx');
  win.MUIRow = lib.Row;
  win.MUICol = lib.Col;

  // forms
  win.MUICheckbox = require('./forms/checkbox.jsx').Checkbox;
  win.MUIForm = require('./forms/form.jsx').Form;
  win.MUIRadio = require('./forms/radio.jsx').Radio;

  lib = require('./forms/select.jsx');
  win.MUISelect = lib.Select;
  win.MUISelectItem = lib.SelectItem;

  lib = require('./forms/textinput.jsx');
  win.MUITextInput = lib.TextInput;
  win.MUITextareaInput = lib.TextareaInput;

  // panels
  win.MUIPanel = require('./panel.jsx').Panel;

  // tabs
  lib = require('./tabs.jsx');
  win.MUITab = lib.Tab;
  win.MUITabs = lib.Tabs;
})(window);

},{"./appbar.jsx":6,"./button.jsx":7,"./caret.jsx":8,"./container.jsx":9,"./divider.jsx":10,"./dropdown.jsx":11,"./forms/checkbox.jsx":13,"./forms/form.jsx":14,"./forms/radio.jsx":15,"./forms/select.jsx":16,"./forms/textinput.jsx":17,"./grid.jsx":18,"./panel.jsx":19,"./tabs.jsx":21}],13:[function(require,module,exports){
/**
 * MUI React checkbox module
 * @module react/forms/checkbox
 */

'use strict';

var PropTypes = React.PropTypes;

/**
 * Checkbox constructor
 * @class
 */
var Checkbox = React.createClass({
  displayName: "Checkbox",

  propTypes: {
    label: PropTypes.string,
    value: PropTypes.string,
    isDisabled: PropTypes.bool
  },
  getDefaultProps: function getDefaultProps() {
    return {
      label: null,
      value: null,
      isDisabled: false
    };
  },
  render: function render() {
    return React.createElement(
      "div",
      { className: "mui-checkbox" },
      React.createElement(
        "label",
        null,
        React.createElement("input", {
          type: "checkbox",
          value: this.props.value,
          disabled: this.props.isDisabled
        }),
        this.props.label
      )
    );
  }
});

/** Define module API */
module.exports = {
  Checkbox: Checkbox
};

},{}],14:[function(require,module,exports){
/**
 * MUI React form module
 * @module react/forms/form
 */

'use strict';

/**
 * Form constructor
 * @class
 */

var Form = React.createClass({
  displayName: 'Form',

  propTypes: {
    isInline: React.PropTypes.bool
  },
  getDefaultProps: function getDefaultProps() {
    return {
      isInline: false
    };
  },
  render: function render() {
    var cls;

    // inline form
    if (this.props.isInline) cls = 'mui-form--inline';

    return React.createElement(
      'form',
      { className: cls },
      this.props.children
    );
  }
});

/** Define module API */
module.exports = {
  Form: Form
};

},{}],15:[function(require,module,exports){
/**
 * MUI React radio module
 * @module react/forms/radio
 */

'use strict';

var PropTypes = React.PropTypes;

/**
 * Radio constructor
 * @class
 */
var Radio = React.createClass({
  displayName: "Radio",

  propTypes: {
    name: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    isChecked: PropTypes.bool,
    isDisabled: PropTypes.bool
  },
  getDefaultProps: function getDefaultProps() {
    return {
      name: null,
      label: null,
      value: null,
      isChecked: false,
      isDisabled: false
    };
  },
  render: function render() {
    return React.createElement(
      "div",
      { className: "mui-radio" },
      React.createElement(
        "label",
        null,
        React.createElement("input", {
          type: "radio",
          name: this.props.name,
          value: this.props.value,
          defaultChecked: this.props.isChecked,
          disabled: this.props.isDisabled
        }),
        this.props.label
      )
    );
  }
});

/** Define module API */
module.exports = {
  Radio: Radio
};

},{}],16:[function(require,module,exports){
/**
 * MUI React select module
 * @module react/forms/select
 */

'use strict';

var jqLite = require('../../js/lib/jqlite.js'),
    util = require('../../js/lib/util.js'),
    formlib = require('../../js/lib/forms.js'),
    PropTypes = React.PropTypes,
    doc = document,
    win = window;

/**
 * Select constructor
 * @class
 */
var Select = React.createClass({
  displayName: 'Select',

  propTypes: {
    name: PropTypes.string,
    isAutofocus: PropTypes.bool,
    isDisabled: PropTypes.bool,
    isMultiple: PropTypes.bool,
    isRequired: PropTypes.bool,
    useDefault: PropTypes.bool,
    onChange: PropTypes.func
  },
  getDefaultProps: function getDefaultProps() {
    return {
      name: null,
      isAutofocus: false,
      isDisabled: false,
      isMultiple: false,
      isRequired: false,
      useDefault: false,
      onChange: null
    };
  },
  getInitialState: function getInitialState() {
    return {
      showMenu: false
    };
  },
  componentDidMount: function componentDidMount() {
    // make wrapper element focusable (to enable Firefox bugfix)
    this.refs.wrapperEl.tabIndex = -1;
  },
  onMousedown: function onMousedown(ev) {
    if (ev.button !== 0 || this.props.useDefault === true) return;
    ev.preventDefault();
  },
  onClick: function onClick(ev) {
    if (ev.button !== 0) return; // only left clicks
    this.showMenu();
  },
  onInnerFocus: function onInnerFocus(ev) {
    // ignore 2nd inner focus (react artifact?)
    if (ev.target.tabIndex === -1) return;

    // check flag
    if (this.props.useDefault === true) return;

    // defer focus to parent
    this.refs.wrapperEl.focus();
  },
  onOuterFocus: function onOuterFocus(ev) {
    // ignore focus on inner element (react artifact)
    if (ev.target !== this.refs.wrapperEl) return;

    // disable tabfocus on inner element
    var selectEl = this.refs.selectEl;
    selectEl._muiOrigIndex = selectEl.tabIndex;
    selectEl.tabIndex = -1;

    // firefox bugfix
    if (selectEl.disabled) return this.refs.wrapperEl.blur();

    // attach keydown handler
    jqLite.on(doc, 'keydown', this.onKeydown);
  },
  onOuterBlur: function onOuterBlur(ev) {
    // ignore blur on inner element
    if (ev.target !== this.refs.wrapperEl) return;

    // restore tab focus on inner element
    var selectEl = this.refs.selectEl;
    selectEl.tabIndex = selectEl._muiOrigIndex;

    // remove keydown handler
    jqLite.off(doc, 'keydown', this.onKeydown);
  },
  onKeydown: function onKeydown(ev) {
    // spacebar, down, up
    if (ev.keyCode === 32 || ev.keyCode === 38 || ev.keyCode === 40) {
      // prevent win scroll
      ev.preventDefault();

      if (this.refs.selectEl.disabled !== true) this.showMenu();
    }
  },
  showMenu: function showMenu() {
    // add scroll lock
    util.enableScrollLock();

    // add event listeners
    jqLite.on(win, 'resize', this.hideMenu);
    jqLite.on(doc, 'click', this.hideMenu);

    // re-draw
    this.setState({ showMenu: true });
  },
  hideMenu: function hideMenu() {
    // remove scroll lock
    util.disableScrollLock();

    // remove event listeners
    jqLite.off(win, 'resize', this.hideMenu);
    jqLite.off(doc, 'click', this.hideMenu);

    // re-draw
    this.setState({ showMenu: false });

    // refocus
    this.refs.selectEl.focus();
  },
  render: function render() {
    var menuElem;

    if (this.state.showMenu) {
      menuElem = React.createElement(Menu, {
        selectEl: this.refs.selectEl,
        wrapperEl: this.refs.wrapperEl,
        teardownFn: this.hideMenu
      });
    }

    return React.createElement(
      'div',
      {
        ref: 'wrapperEl',
        className: 'mui-select',
        onFocus: this.onOuterFocus,
        onBlur: this.onOuterBlur
      },
      React.createElement(
        'select',
        {
          ref: 'selectEl',
          name: this.props.name,
          autofocus: this.props.isAutofocus,
          disabled: this.props.isDisabled,
          multiple: this.props.isMultiple,
          required: this.props.isRequired,
          onMouseDown: this.onMousedown,
          onClick: this.onClick,
          onFocus: this.onInnerFocus
        },
        this.props.children
      ),
      menuElem
    );
  }
});

/**
 * SelectItem constructor
 * @class
 */
var SelectItem = React.createClass({
  displayName: 'SelectItem',

  propTypes: {
    value: PropTypes.string,
    label: PropTypes.string
  },
  getDefaultProps: function getDefaultProps() {
    return {
      value: null,
      label: null
    };
  },
  render: function render() {
    return React.createElement(
      'option',
      { value: this.props.value },
      this.props.label
    );
  }
});

/**
 * Menu constructor
 * @class
 */
var Menu = React.createClass({
  displayName: 'Menu',

  getDefaultProps: function getDefaultProps() {
    return {
      selectEl: null,
      wrapperEl: null,
      teardownFn: null
    };
  },
  getInitialState: function getInitialState() {
    return {
      origIndex: null,
      currentIndex: null
    };
  },
  componentWillMount: function componentWillMount() {
    var optionList = this.props.selectEl.children,
        m = optionList.length,
        selectedPos = 0,
        i;

    // get current selected position
    for (i = m - 1; i > -1; i--) {
      if (optionList[i].selected) selectedPos = i;
    }this.setState({ origIndex: selectedPos, currentIndex: selectedPos });

    // blur active element (IE10 bugfix)
    setTimeout(function () {
      if (doc.activeElement.nodeName.toLowerCase() !== 'body') {
        doc.activeElement.blur();
      }
    }, 0);
  },
  componentDidMount: function componentDidMount() {
    // set position
    var props = formlib.getMenuPositionalCSS(this.props.wrapperEl, this.props.selectEl.children.length, this.state.currentIndex);

    var el = ReactDOM.findDOMNode(this);
    jqLite.css(el, props);
    jqLite.scrollTop(el, props.scrollTop);

    // attach keydown handler
    jqLite.on(doc, 'keydown', this.onKeydown);
  },
  componentWillUnmount: function componentWillUnmount() {
    // remove keydown handler
    jqLite.off(doc, 'keydown', this.onKeydown);
  },
  onClick: function onClick(pos, ev) {
    // don't allow events to bubble
    ev.stopPropagation();

    // select option
    this.selectCurrent(pos);

    // destroy menu
    this.destroy();
  },
  onKeydown: function onKeydown(ev) {
    var keyCode = ev.keyCode;

    // tab
    if (keyCode === 9) return this.destroy();

    // escape | up | down | enter
    if (keyCode === 27 || keyCode === 40 || keyCode === 38 || keyCode === 13) {
      ev.preventDefault();
    }

    if (keyCode === 27) {
      this.destroy();
    } else if (keyCode === 40) {
      this.increment();
    } else if (keyCode === 38) {
      this.decrement();
    } else if (keyCode === 13) {
      this.selectCurrent();
      this.destroy();
    }
  },
  increment: function increment() {
    if (this.state.currentIndex === this.props.selectEl.children.length - 1) {
      return;
    }

    this.setState({ currentIndex: this.state.currentIndex + 1 });
  },
  decrement: function decrement() {
    if (this.state.currentIndex === 0) return;
    this.setState({ currentIndex: this.state.currentIndex - 1 });
  },
  selectCurrent: function selectCurrent(pos) {
    var state = this.state,
        currentIndex = pos === undefined ? state.currentIndex : pos;

    if (currentIndex !== state.origIndex) {
      var optionEls = this.props.selectEl.children;
      optionEls[state.origIndex].selected = false;
      optionEls[currentIndex].selected = true;
    }
  },
  destroy: function destroy() {
    this.props.teardownFn();
  },
  render: function render() {
    var menuItems = [],
        optionList = this.props.selectEl.children,
        m = optionList.length,
        cls,
        i;

    // define menu items
    for (i = 0; i < m; i++) {
      cls = i === this.state.currentIndex ? 'mui--is-selected' : '';

      menuItems.push(React.createElement(
        'div',
        {
          key: i,
          className: cls,
          onClick: this.onClick.bind(null, i)
        },
        optionList[i].textContent
      ));
    }

    return React.createElement(
      'div',
      { className: 'mui-select__menu' },
      menuItems
    );
  }
});

/** Define module API */
module.exports = {
  Select: Select,
  SelectItem: SelectItem
};

},{"../../js/lib/forms.js":2,"../../js/lib/jqlite.js":4,"../../js/lib/util.js":5}],17:[function(require,module,exports){
/**
 * MUI React textinput module
 * @module react/forms/textinput
 */

'use strict';

var util = require('../../js/lib/util.js'),
    PropTypes = React.PropTypes;

/**
 * Input constructor
 * @class
 */
var Input = React.createClass({
  displayName: 'Input',

  propTypes: {
    type: PropTypes.string,
    value: PropTypes.string,
    hint: PropTypes.string,
    isAutofocus: PropTypes.bool,
    onChange: PropTypes.func
  },
  getDefaultProps: function getDefaultProps() {
    return {
      type: null,
      value: '',
      hint: null,
      isAutofocus: false,
      onChange: null
    };
  },
  getInitialState: function getInitialState() {
    var v = this.props.value;

    return {
      value: v,
      isDirty: Boolean(v.length)
    };
  },
  render: function render() {
    var cls = {},
        isNotEmpty = Boolean(this.state.value),
        inputEl;

    cls['mui--is-empty'] = !isNotEmpty;
    cls['mui--is-not-empty'] = isNotEmpty;
    cls['mui--is-dirty'] = this.state.isDirty;
    cls['mui--is-invalid'] = this.props.isInvalid;

    cls = util.classNames(cls);

    if (this.props.type === 'textarea') {
      inputEl = React.createElement('textarea', {
        ref: 'input',
        className: cls,
        rows: this.props.rows,
        placeholder: this.props.hint,
        defaultValue: this.props.value,
        autoFocus: this.props.isAutofocus,
        onChange: this._handleChange,
        onFocus: this._handleFocus,
        required: this.props.isRequired
      });
    } else {
      inputEl = React.createElement('input', {
        ref: 'input',
        className: cls,
        type: this.props.type,
        defaultValue: this.state.value,
        placeholder: this.props.hint,
        autoFocus: this.props.autofocus,
        onChange: this._handleChange,
        onFocus: this._handleFocus,
        required: this.props.isRequired
      });
    }

    return inputEl;
  },
  _handleChange: function _handleChange(ev) {
    this.setState({ value: ev.target.value });
    if (this.props.onChange) this.props.onChange(ev);
  },
  _handleFocus: function _handleFocus(ev) {
    this.setState({ isDirty: true });
  }
});

/**
 * Label constructor
 * @class
 */
var Label = React.createClass({
  displayName: 'Label',

  getDefaultProps: function getDefaultProps() {
    return {
      text: '',
      onClick: null
    };
  },
  getInitialState: function getInitialState() {
    return {
      style: {}
    };
  },
  componentDidMount: function componentDidMount() {
    setTimeout((function () {
      var s = '.15s ease-out',
          style;

      style = {
        transition: s,
        WebkitTransition: s,
        MozTransition: s,
        OTransition: s,
        msTransform: s
      };

      this.setState({
        style: style
      });
    }).bind(this), 150);
  },
  render: function render() {
    return React.createElement(
      'label',
      {
        refs: 'label',
        style: this.state.style,
        onClick: this.props.onClick
      },
      this.props.text
    );
  }
});

/**
 * TextField constructor
 * @class
 */
var TextField = React.createClass({
  displayName: 'TextField',

  propTypes: {
    label: PropTypes.string,
    isLabelFloating: PropTypes.bool
  },
  getDefaultProps: function getDefaultProps() {
    return {
      label: '',
      isLabelFloating: false
    };
  },
  render: function render() {
    var cls = {},
        labelEl;

    if (this.props.label.length) {
      labelEl = React.createElement(Label, {
        text: this.props.label,
        onClick: this._focus
      });
    }

    cls['mui-textfield'] = true;
    cls['mui-textfield--float-label'] = this.props.isLabelFloating;
    cls = util.classNames(cls);

    return React.createElement(
      'div',
      { className: cls },
      React.createElement(Input, this.props),
      labelEl
    );
  },
  _focus: function _focus(e) {
    // pointer-events shim
    if (util.supportsPointerEvents() === false) {
      e.target.style.cursor = 'text';
      ReactDOM.findDOMNode(this.refs.input).focus();
    }
  }
});

/**
 * TextInput constructor
 * @class
 */
var TextInput = React.createClass({
  displayName: 'TextInput',

  propTypes: {
    type: PropTypes.oneOf(['text', 'email', 'password'])
  },
  getDefaultProps: function getDefaultProps() {
    return {
      type: 'text'
    };
  },
  render: function render() {
    return React.createElement(TextField, this.props);
  }
});

/**
 * TextareaInput constructor
 * @class
 */
var TextareaInput = React.createClass({
  displayName: 'TextareaInput',

  propTypes: {
    rows: PropTypes.number
  },
  getDefaultProps: function getDefaultProps() {
    return {
      type: 'textarea',
      rows: 2
    };
  },
  render: function render() {
    return React.createElement(TextField, this.props);
  }
});

/** Define module API */
module.exports = {
  TextInput: TextInput,
  TextareaInput: TextareaInput
};

},{"../../js/lib/util.js":5}],18:[function(require,module,exports){
/**
 * MUI React grid module
 * @module react/grid
 */

'use strict';

var util = require('../js/lib/util.js'),
    breakpoints = ['xs', 'sm', 'md', 'lg'];

/**
 * Row constructor
 * @class
 */
var Row = React.createClass({
  displayName: 'Row',

  render: function render() {
    return React.createElement(
      'div',
      { className: 'mui-row' },
      this.props.children
    );
  }
});

/**
 * Col constructor
 * @class
 */
var Col = React.createClass({
  displayName: 'Col',

  getDefaultProps: function getDefaultProps() {
    var props = {},
        i,
        v;

    // add {breakpoint}, {breakpoint}-offset to props
    for (i = breakpoints.length - 1; i > -1; i--) {
      v = breakpoints[i];
      props[v] = null;
      props[v + '-offset'] = null;
    }

    return props;
  },
  render: function render() {
    var cls = {},
        i,
        bk,
        val,
        baseCls;

    // add mui-col classes
    for (i = breakpoints.length - 1; i > -1; i--) {
      bk = breakpoints[i];
      baseCls = 'mui-col-' + bk;

      // add mui-col-{bk}-{val}
      val = this.props[bk];
      if (val) cls[baseCls + '-' + val] = true;

      // add mui-col-{bk}-offset-{val}
      val = this.props[bk + '-offset'];
      if (val) cls[baseCls + '-offset-' + val] = true;
    }

    cls = util.classNames(cls);

    return React.createElement(
      'div',
      { className: cls },
      this.props.children
    );
  }
});

/** Define module API */
module.exports = {
  Row: Row,
  Col: Col
};

},{"../js/lib/util.js":5}],19:[function(require,module,exports){
/**
 * MUI React layout module
 * @module react/layout
 */

'use strict';

/**
 * Panel constructor
 * @class
 */

var Panel = React.createClass({
  displayName: 'Panel',

  render: function render() {
    return React.createElement(
      'div',
      { className: 'mui-panel' },
      this.props.children
    );
  }
});

/** Define module API */
module.exports = {
  Panel: Panel
};

},{}],20:[function(require,module,exports){
/**
 * MUI React ripple module
 * @module react/ripple
 */

'use strict';

var jqLite = require('../js/lib/jqLite.js');

var rippleClass = 'mui-ripple-effect';

/**
 * Ripple singleton
 */
var Ripple = {
  getInitialState: function getInitialState() {
    return {
      touchFlag: false,
      ripples: []
    };
  },
  getDefaultProps: function getDefaultProps() {
    return {
      rippleClass: rippleClass
    };
  },
  ripple: function ripple(ev) {
    // only left clicks
    if (ev.button !== 0) return;

    var buttonEl = ReactDOM.findDOMNode(this);

    // exit if button is disabled
    if (this.props.disabled === true) return;

    // de-dupe touchstart and mousedown with 100msec flag
    if (this.state.touchFlag === true) {
      return;
    } else {
      this.setState({ touchFlag: true });
      setTimeout((function () {
        this.setState({ touchFlag: false });
      }).bind(this), 100);
    }

    var offset = jqLite.offset(buttonEl),
        xPos = ev.pageX - offset.left,
        yPos = ev.pageY - offset.top,
        diameter,
        radius;

    // get height
    if (this.props.floating) {
      diameter = offset.height / 2;
    } else {
      diameter = offset.height;
    }

    radius = diameter / 2;

    var style = {
      height: diameter,
      width: diameter,
      top: yPos - radius,
      left: xPos - radius
    };

    var ripples = this.state.ripples || [];

    window.setTimeout((function () {
      this._removeRipple();
    }).bind(this), 2000);

    ripples.push({ style: style });

    this.setState({
      ripples: ripples
    });
  },
  _removeRipple: function _removeRipple() {
    this.state.ripples.shift();
    this.setState({
      ripples: this.state.ripples
    });
  },
  renderRipples: function renderRipples() {
    if (this.state.ripples.length === 0) return;

    var i = 0;
    return this.state.ripples.map((function (ripple) {
      i++;
      return React.createElement('div', {
        className: this.props.rippleClass,
        key: i,
        style: ripple.style
      });
    }).bind(this));
  }
};

/** Define module API */
module.exports = Ripple;

},{"../js/lib/jqLite.js":3}],21:[function(require,module,exports){
/**
 * MUI React tabs module
 * @module react/tabs
 */
/* jshint quotmark:false */
// jscs:disable validateQuoteMarks

'use strict';

var util = require('../js/lib/util.js'),
    PropTypes = React.PropTypes;

var tabsBarClass = 'mui-tabs__bar',
    tabsBarJustifiedClass = 'mui-tabs__bar--justified',
    tabsPaneClass = 'mui-tabs__pane',
    isActiveClass = 'mui--is-active';

/**
 * Tabs constructor
 * @class
 */
var Tabs = React.createClass({
  displayName: 'Tabs',

  propTypes: {
    initialSelectedIndex: PropTypes.number,
    isJustified: PropTypes.bool,
    onChange: PropTypes.func
  },
  getDefaultProps: function getDefaultProps() {
    return {
      initialSelectedIndex: 0,
      isJustified: false,
      onChange: null
    };
  },
  getInitialState: function getInitialState() {
    return {
      currentSelectedIndex: this.props.initialSelectedIndex
    };
  },
  render: function render() {
    var tabEls = [],
        paneEls = [],
        children = this.props.children,
        m = children.length,
        selectedIndex = this.state.currentSelectedIndex % m,
        isActive,
        item,
        cls,
        i;

    for (i = 0; i < m; i++) {
      item = children[i];

      // only accept MUITab elements
      if (item.type !== Tab) util.raiseError('Expecting MUITab React Element');

      isActive = i === selectedIndex ? true : false;

      // tab element
      tabEls.push(React.createElement(
        'li',
        { key: i, className: isActive ? isActiveClass : '' },
        React.createElement(
          'a',
          { onClick: this._handleClick.bind(this, i, item) },
          item.props.label
        )
      ));

      // pane element
      cls = tabsPaneClass + ' ';
      if (isActive) cls += isActiveClass;

      paneEls.push(React.createElement(
        'div',
        { key: i, className: cls },
        item.props.children
      ));
    }

    cls = tabsBarClass;
    if (this.props.isJustified) cls += ' ' + tabsBarJustifiedClass;

    return React.createElement(
      'div',
      null,
      React.createElement(
        'ul',
        { className: cls },
        tabEls
      ),
      paneEls
    );
  },
  _handleClick: function _handleClick(i, tab, ev) {
    if (i !== this.state.currentSelectedIndex) {
      this.setState({ currentSelectedIndex: i });

      // onActive callback
      if (tab.props.onActive) tab.props.onActive(tab);

      // onChange callback
      if (this.props.onChange) {
        this.props.onChange(i, tab.props.value, tab, ev);
      }
    }
  }
});

/**
 * Tab constructor
 * @class
 */
var Tab = React.createClass({
  displayName: 'Tab',

  propTypes: {
    value: PropTypes.any,
    label: PropTypes.string,
    onActive: PropTypes.func
  },
  getDefaultProps: function getDefaultProps() {
    return {
      value: null,
      label: '',
      onActive: null
    };
  },
  render: function render() {
    return null;
  }
});

/** Define module API */
module.exports = {
  Tab: Tab,
  Tabs: Tabs
};

},{"../js/lib/util.js":5}]},{},[12])