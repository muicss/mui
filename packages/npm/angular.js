/**
 * MUI NPM Package
 * @module pkg/angular.js
 */

var angular = require('angular'),
    moduleName = 'mui';


angular.module(moduleName, [
  require('./lib/angular/appbar'),
  require('./lib/angular/button'),
  require('./lib/angular/caret'),
  require('./lib/angular/container'),
  require('./lib/angular/divider'),
  require('./lib/angular/dropdown'),
  require('./lib/angular/dropdown-item'),
  require('./lib/angular/panel'),
  require('./lib/angular/input'),
  require('./lib/angular/row'),
  require('./lib/angular/col'),
  require('./lib/angular/tabs'),
  require('./lib/angular/radio'),
  require('./lib/angular/checkbox'),
  require('./lib/angular/select'),
  require('./lib/angular/form')
]);


/** Define module API */
module.exports = moduleName;
