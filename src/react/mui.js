/**
 * MUI React main module
 * @module react/main
 */

(function(win) {
  // return if library has been loaded already
  if (win._muiReactLoaded) return;
  else win._muiReactLoaded = true;

  // load dependencies
  var appbar = require('./appbar.jsx'),
      caret = require('./caret.jsx'),
      container = require('./container.jsx'),
      divider = require('./divider.jsx'),
      forms = require('./forms.jsx'),
      buttons = require('./buttons.jsx'),
      dropdowns = require('./dropdowns.jsx'),
      tabs = require('./tabs.jsx');

  // export React classes
  win.MUIAppbar = appbar.Appbar;
  win.MUIButton = buttons.Button;
  win.MUICaret = caret.Caret;
  win.MUIContainer = container.Container;
  win.MUIDivider = divider.Divider;

  win.MUITextfield = forms.Textfield;



  win.MUIDropdown = dropdowns.Dropdown;
  win.MUIDropdownItem = dropdowns.DropdownItem;
 
  win.MUITab = tabs.Tab;
  win.MUITabs = tabs.Tabs;
  
})(window);
