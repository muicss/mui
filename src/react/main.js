/**
 * MUI React main module
 * @module react/main
 */

(function(win) {
  // return if library has been loaded already
  if (win._muiLoadedReact) return;
  else win._muiLoadedReact = true;

  // load dependencies
  var jqLite = require('../js/lib/jqLite.js'),
      forms = require('./forms.jsx'),
      ripple = require('../js/ripple.js'),
      doc = win.document;

  // export React classes
  win.MUIFormControl = forms.FormControl;
  win.MUIFormGroup = forms.FormGroup;

  // init libraries
  jqLite.ready(function() {
    ripple.initListeners();
  });
})(window);
