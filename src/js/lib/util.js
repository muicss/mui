/**
 * MUI JS lib module
 *
 **/
'use strict';

var config = require('../config.js'),
    jqLite = require('./jqLite.js');


// --------------------------
// Shared variables
// --------------------------
var win = window,
    doc = window.document;

var head = doc.head
  || doc.getElementsByTagName('head')[0] 
  || doc.documentElement;


// -------------------------
// log
// -------------------------
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


// -------------------------
// loadStyle
// -------------------------
function loadStyleFn(s) {
  if (doc.createStyleSheet) {
    doc.createStyleSheet().cssText = s;
  } else {
    var e = doc.createElement('style');
    e.type = 'text/css';
    
    if (e.styleSheet) e.styleSheet.cssText = s;
    else e.appendChild(doc.createTextNode(s));
    
    // add to document
    head.insertBefore(e, head.firstChild);
  }
}


// -------------------------
// Raise
// -------------------------
function raiseErrorFn(msg) {
  throw "MUI Error: " + msg;
}


// -------------------------
// onAnimationStart
// -------------------------
var animationCallbacks = {};


function onAnimationStartFn(animationName, callbackFn) {
  if (animationName in animationCallbacks) {
    animationCallbacks[animationName].push(callbackFn);
  } else {
    animationCallbacks[animationName] = [callbackFn];
  }

  // initalize listeners
  if (animationCallbacks._initialized === undefined) {
    jqLite.on(doc, 'animationstart', animationHandlerFn);
    jqLite.on(doc, 'mozAnimationStart', animationHandlerFn);
    jqLite.on(doc, 'webkitAnimationStart', animationHandlerFn);

    animationCallbacks._initialized = true;
  }
}


function animationHandlerFn(ev) {
  var callbacks = animationCallbacks[ev.animationName];

  if (callbacks) {
    for (var i=callbacks.length - 1; i >= 0; i--) callbacks[i](ev.target);
  }
}


// -------------------------
// Module API
// -------------------------
module.exports = {
  log: logFn,
  loadStyle: loadStyleFn,
  onAnimationStart: onAnimationStartFn,
  raiseError: raiseErrorFn
};
