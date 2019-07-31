var babelHelpers = require('./babel-helpers.js');
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _angular = babelHelpers.interopRequireDefault(require("angular"));

/**
 * MUI Angular DropdownItem Component
 * @module angular/dropdown-item
 */
var moduleName = 'mui.dropdown-item';

_angular.default.module(moduleName, []).directive('muiDropdownItem', function () {
  return {
    restrict: 'AE',
    replace: true,
    scope: {
      link: '@'
    },
    transclude: true,
    template: '<li><a href="{{link}}" ng-transclude></a></li>'
  };
});
/** Define module API */


var _default = moduleName;
exports.default = _default;
module.exports = exports.default;