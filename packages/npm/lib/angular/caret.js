var babelHelpers = require('./babel-helpers.js');
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = require('angular');

var _angular2 = babelHelpers.interopRequireDefault(_angular);

var moduleName = 'mui.caret'; /**
                               * MUI Angular Caret Component
                               * @module angular/caret
                               */

_angular2.default.module(moduleName, []).directive('muiCaret', function () {
  return {
    restrict: 'AE',
    replace: true,
    template: '<span class="mui-caret"></span>'
  };
});

/** Define module API */
exports.default = moduleName;
module.exports = exports['default'];