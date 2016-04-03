/**
 * MUI Combined Angular module
 * @module angular/mui-combined
 */
(function(win) {
  // return if library has already been loaded
  if (win._muiAngularCombinedLoaded) return;
  else win._muiAngularCombinedLoaded = true;

  var util = require('src/js/lib/util');

  // load css
  util.loadStyle(require('mui.min.css'));

  // load js
  require('./cdn-angular');
})(window);
