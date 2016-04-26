var babelHelpers = require('./babel-helpers.js');
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = require('angular');

var _angular2 = babelHelpers.interopRequireDefault(_angular);

var moduleName = 'mui.dropdown-item'; /**
                                       * MUI Angular DropdownItem Component
                                       * @module angular/dropdown-item
                                       */

_angular2.default.module(moduleName, []).directive('muiDropdownItem', function () {
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
exports.default = moduleName;
module.exports = exports['default'];