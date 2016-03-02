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
  var jqLite = require('src/js/lib/jqLite'),
      dropdown = require('src/js/dropdown'),
      overlay = require('src/js/overlay'),
      ripple = require('src/js/ripple'),      
      select = require('src/js/select'),
      tabs = require('src/js/tabs'),
      textfield = require('src/js/textfield');

  // expose api
  win.mui = {
    overlay: overlay,
    tabs: tabs.api
  };
  
  // init libraries
  jqLite.ready(function() {
    textfield.initListeners();
    select.initListeners();
    ripple.initListeners();
    dropdown.initListeners();
    tabs.initListeners();
  });
})(window);
