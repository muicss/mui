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
      textfield = require('src/js/forms/textfield'),
      select = require('src/js/forms/select'),
      ripple = require('src/js/ripple'),
      dropdowns = require('src/js/dropdowns'),
      tabs = require('src/js/tabs'),
      overlay = require('src/js/overlay');

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
    dropdowns.initListeners();
    tabs.initListeners();
  });
})(window);
