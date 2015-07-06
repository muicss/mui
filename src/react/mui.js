/**
 * MUI React main module
 * @module react/main
 */

(function(win) {
  // return if library has been loaded already
  if (win._muiReactLoaded) return;
  else win._muiReactLoaded = true;

  // load dependencies
  var layout = require('./layout.jsx'),
      forms = require('./forms.jsx'),
      buttons = require('./buttons.jsx'),
      dropdowns = require('./dropdowns.jsx'),
      tabs = require('./tabs.jsx'),
      doc = win.document;

  // export React classes
  win.MUIContainer = layout.Container;
  win.MUIFluidContainer = layout.FluidContainer;
  win.MUIPanel = layout.Panel;

  win.MUIFormControl = forms.FormControl;
  win.MUIFormGroup = forms.FormGroup;

  win.MUIButton = buttons.Button;
  win.MUIRoundButton = buttons.RoundButton;

  win.MUIDropdown = dropdowns.Dropdown;
  win.MUIDropdownItem = dropdowns.DropdownItem;
 
  win.MUITabs = tabs.Tabs;
  win.MUITabItem = tabs.TabItem;
  
})(window);
