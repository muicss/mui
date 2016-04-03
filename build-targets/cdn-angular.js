/**
 * MUI Angular main module
 * @module angular/main
 */

(function(win) {
  // return if library has been loaded already
  if (win._muiAngularLoaded) return;
  else win._muiAngularLoaded = true;

  var mui = win.mui = win.mui || [],
      muiNg = mui.angular = {};

  muiNg.Appbar = require('src/angular/appbar');
  muiNg.Button = require('src/angular/button');
  muiNg.Caret = require('src/angular/caret');
  muiNg.Container = require('src/angular/container');
  muiNg.Divider = require('src/angular/divider');
  muiNg.Dropdown = require('src/angular/dropdown'),
  muiNg.DropdownItem = require('src/angular/dropdown-item'),
  muiNg.Panel = require('src/angular/panel');
  muiNg.Input = require('src/angular/input');
  muiNg.Row = require('src/angular/row');
  muiNg.Col = require('src/angular/col');
  muiNg.Tabs = require('src/angular/tabs');
  muiNg.Radio = require('src/angular/radio');
  muiNg.Checkbox = require('src/angular/checkbox');
  muiNg.Select = require('src/angular/select');
  muiNg.Form = require('src/angular/form');

  // define angular "mui" module
  win.angular.module("mui", [
    muiNg.Appbar.name,
    muiNg.Button.name,
    muiNg.Caret.name,
    muiNg.Container.name,
    muiNg.Divider.name,
    muiNg.Dropdown.name,
    muiNg.DropdownItem.name,
    muiNg.Panel.name,
    muiNg.Input.name,
    muiNg.Row.name,
    muiNg.Col.name,
    muiNg.Tabs.name,
    muiNg.Radio.name,
    muiNg.Checkbox.name,
    muiNg.Select.name,
    muiNg.Form.name
  ]);
})(window);
