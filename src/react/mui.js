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
      button = require('./button.jsx'),
      caret = require('./caret.jsx'),
      container = require('./container.jsx'),
      divider = require('./divider.jsx'),
      dropdown = require('./dropdown.jsx'),
      forms = require('./forms.jsx'),
      grid = require('./grid.jsx'),
      panel = require('./panel.jsx'),
      tabs = require('./tabs.jsx');

  // export React classes
  win.MUIAppbar = appbar.Appbar;
  win.MUIButton = button.Button;
  win.MUICaret = caret.Caret;
  win.MUIContainer = container.Container;
  win.MUIDivider = divider.Divider;
  win.MUIDropdown = dropdown.Dropdown;
  win.MUIDropdownItem = dropdown.DropdownItem;
  win.MUIRow = grid.Row;
  win.MUICol = grid.Col;
  win.MUIPanel = panel.Panel;
  win.MUITab = tabs.Tab;
  win.MUITabs = tabs.Tabs;

  win.MUITextfield = forms.Textfield;   
})(window);
