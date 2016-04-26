var babelHelpers = require('./babel-helpers.js');
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = require('angular');

var _angular2 = babelHelpers.interopRequireDefault(_angular);

var moduleName = 'mui.row'; /**
                             * MUI Angular Grid/Row Module
                             * @module angular/row.js
                             */

_angular2.default.module('mui.row', []).directive('muiRow', function () {
  return {
    restrict: 'AE',
    scope: true,
    replace: true,
    template: '<div class="mui-row"></div>',
    transclude: true,
    link: function link(scope, element, attr, controller, transcludeFn) {
      transcludeFn(scope, function (clone) {
        element.append(clone);
      });
    }
  };
});

/** Define module API */
exports.default = moduleName;
module.exports = exports['default'];