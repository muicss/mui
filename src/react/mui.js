/**
 * MUI React main module
 * @module react/main
 */

(function(win) {
  // return if library has been loaded already
  if (win._muiLoadedReact) return;
  else win._muiLoadedReact = true;

  // load dependencies
  var tabs = require('./tabs.jsx'),
      forms = require('./forms.jsx'),
      doc = win.document;

  // export React classes
  win.MUITabs = tabs.Tabs;
  win.MUITabItem = tabs.TabItem;
  win.MUIFormControl = forms.FormControl;
  win.MUIFormGroup = forms.FormGroup;
  
})(window);
