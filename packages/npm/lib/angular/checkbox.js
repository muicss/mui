var babelHelpers = require('./babel-helpers.js');
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = require('angular');

var _angular2 = babelHelpers.interopRequireDefault(_angular);

var moduleName = 'mui.checkbox'; /**
                                  * MUI Angular Checkbox Component
                                  * @module angular/checkox
                                  */

_angular2.default.module(moduleName, []).directive('muiCheckbox', function () {
  return {
    restrict: 'AE',
    replace: true,
    require: ['?ngModel'],
    scope: {
      label: '@',
      name: '@',
      value: '@',
      ngModel: '=',
      ngDisabled: '='
    },
    template: '<div class="mui-checkbox">' + '<label>' + '<input type="checkbox" ' + 'name={{name}} ' + 'value={{value}} ' + 'ng-model="ngModel" ' + 'ng-disabled="ngDisabled" ' + '>{{label}}</label> ' + '</div>'
  };
});

/** Define module API */
exports.default = moduleName;
module.exports = exports['default'];