var babelHelpers = require('./babel-helpers.js');
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _angular = babelHelpers.interopRequireDefault(require("angular"));

/**
 * MUI Angular Grid/Row Module
 * @module angular/row.js
 */
var moduleName = 'mui.row';

_angular.default.module('mui.row', []).directive('muiRow', function () {
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


var _default = moduleName;
exports.default = _default;
module.exports = exports.default;