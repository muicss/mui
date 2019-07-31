var babelHelpers = require('./babel-helpers.js');
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _angular = babelHelpers.interopRequireDefault(require("angular"));

/**
 * MUI Angular Panel Component
 * @module angular/panel
 */
var moduleName = 'mui.panel';

_angular.default.module(moduleName, []).directive('muiPanel', function () {
  return {
    restrict: 'AE',
    replace: true,
    scope: true,
    template: '<div class="mui-panel"></div>',
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