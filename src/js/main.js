/**
 * MUI CSS/JS main module
 * @module main
 */

(function(win) {
  'use strict';

  // return if library has been loaded already
  if (win._muiLoadedJS) return;
  else win._muiLoadedJS = true;
  
  // load dependencies
  var jqLite = require('./lib/jqLite.js'),
      util = require('./lib/util.js'),
      forms = require('./forms.js'),
      ripple = require('./ripple.js'),
      dropdowns = require('./dropdowns.js'),
      tabs = require('./tabs.js'),
      overlay = require('./overlay.js');

  // expose api
  win.mui = {
    overlay: overlay
  };
  
  // init libraries
  jqLite.ready(function() {
    forms.initListeners();
    ripple.initListeners();
    dropdowns.initListeners();
    tabs.initListeners();
  });
})(window);
