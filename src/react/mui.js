/**
 * MUI React main module
 * @module react/main
 */

(function(win) {
  // return if library has been loaded already
  if (win._muiReactLoaded) return;
  else win._muiReactLoaded = true;

  var lib;

  // appbar
  win.MUIAppbar = require('./appbar.jsx').Appbar;

  // buttons
  win.MUIButton = require('./button.jsx').Button;

  // caret
  win.MUICaret = require('./caret.jsx').Caret;

  // container
  win.MUIContainer = require('./container.jsx').Container;

  // dividers
  win.MUIDivider = require('./divider.jsx').Divider;

  // dropdowns
  lib = require('./dropdown.jsx');
  win.MUIDropdown = lib.Dropdown;
  win.MUIDropdownItem = lib.DropdownItem;

  // grid
  lib = require('./grid.jsx');
  win.MUIRow = lib.Row;
  win.MUICol = lib.Col;

  // forms
  win.MUICheckbox = require('./forms/checkbox.jsx').Checkbox;
  win.MUIForm = require('./forms/form.jsx').Form;
  win.MUIRadio = require('./forms/radio.jsx').Radio;

  lib = require('./forms/select.jsx')
  win.MUISelect = lib.Select;
  win.MUISelectItem = lib.SelectItem;

  lib = require('./forms/textinput.jsx');
  win.MUITextInput = lib.TextInput
  win.MUITextareaInput = lib.TextareaInput

  // panels
  win.MUIPanel = require('./panel.jsx').Panel;

  // tabs
  lib = require('./tabs.jsx');
  win.MUITab = lib.Tab;
  win.MUITabs = lib.Tabs;
})(window);
