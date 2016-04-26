var babelHelpers = require('./babel-helpers.js');
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = require('angular');

var _angular2 = babelHelpers.interopRequireDefault(_angular);

var moduleName = 'mui.radio'; /**
                               * MUI Angular Radio Component
                               * @module angular/radio
                               */

_angular2.default.module(moduleName, []).directive('muiRadio', function () {
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
    template: '<div class="mui-radio">' + '<label>' + '<input type="radio" ' + 'name={{name}} ' + 'value={{value}} ' + 'ng-model="ngModel" ' + 'ng-disabled="ngDisabled" ' + '>{{label}}</label> ' + '</div>'
  };
});

/** Define module API */
exports.default = moduleName;
module.exports = exports['default'];