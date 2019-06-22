var babelHelpers = require('./babel-helpers.js');
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _angular = babelHelpers.interopRequireDefault(require("angular"));

/**
 * MUI Angular Caret Component
 * @module angular/caret
 */
var moduleName = 'mui.caret';

_angular["default"].module(moduleName, []).directive('muiCaret', function () {
  return {
    restrict: 'AE',
    replace: true,
    template: '<span class="mui-caret"></span>'
  };
});
/** Define module API */


var _default = moduleName;
exports["default"] = _default;
module.exports = exports.default;