/**
 * MUI CSS/JS utilities module
 * @module lib/util
 */
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
// onNodeInserted
// -------------------------
var nodeInsertedCallbacks = [];


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
  for (var i=nodeInsertedCallbacks.length - 1; i >= 0; i--) {
    nodeInsertedCallbacks[i](el);
  }
}


/**
 * Define the module API
 */
module.exports = {
  log: logFn,
  loadStyle: loadStyleFn,
  onNodeInserted: onNodeInsertedFn,
  raiseError: raiseErrorFn
};
