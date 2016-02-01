/**
 * MUI Angular main module
 * @module angular/main
 */

(function(win) {
  // return if library has been loaded already
  if (win._muiAngularLoaded) return;
  else win._muiAngularLoaded = true;

  var mui = win.mui = win.mui || [],
      angular = mui.angular = {},
      lib;

  angular.Appbar = require('src/angular/appbar');
  angular.Button = require('src/angular/button');
  angular.Caret = require('src/angular/caret');
  angular.Container = require('src/angular/container');
  angular.Divider = require('src/angular/divider');
  angular.Dropdown = require('src/angular/dropdown'),
  angular.DropdownItem = require('src/angular/dropdown-item'),
  angular.Panel = require('src/angular/panel');
  angular.Input = require('src/angular/input');

  win.angular.module("mui", [
                              angular.Appbar.name,
                              angular.Button.name,
                              angular.Caret.name,
                              angular.Container.name,
                              angular.Divider.name,
                              angular.Dropdown.name,
                              angular.DropdownItem.name,
                              angular.Panel.name,
                              angular.Input.name
                           ]);
})(window);
