/**
 * MUI CSS/JS combined module
 * @module combined
 */
(function(win) {
  // return if library has already been loaded
  if (win._muiCombinedLoadedJS) return;
  else win._muiCombinedLoadedJS = true;

  var util = require('./lib/util.js');

  // load css
  util.loadStyle(require('mui.min.css'));

  // load js
  require('./mui.js');
})(window);
