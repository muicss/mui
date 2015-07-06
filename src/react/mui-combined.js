/**
 * MUI Combined React module
 * @module react/mui-combined
 */
(function(win) {
  // return if library has already been loaded
  if (win._muiReactCombinedLoaded) return;
  else win._muiReactCombinedLoaded = true;

  var util = require('../js/lib/util.js');

  // load css
  util.loadStyle(require('mui.min.css'));

  // load js
  require('./mui.js');
})(window);