/**
 * MUI Angular main module
 * @module angular/main
 */

(function(win) {
  // return if library has been loaded already
  if (win._muiAngularLoaded) return;
  else win._muiAngularLoaded = true;

  win.angular.module('mui', [
    require('src/angular/appbar'),
    require('src/angular/button'),
    require('src/angular/caret'),
    require('src/angular/container'),
    require('src/angular/divider'),
    require('src/angular/dropdown'),
    require('src/angular/dropdown-item'),
    require('src/angular/panel'),
    require('src/angular/input'),
    require('src/angular/row'),
    require('src/angular/col'),
    require('src/angular/tabs'),
    require('src/angular/radio'),
    require('src/angular/checkbox'),
    require('src/angular/select'),
    require('src/angular/form')
  ]);
})(window);
