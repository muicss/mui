var babelHelpers = require('./babel-helpers.js');
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _angular = babelHelpers.interopRequireDefault(require("angular"));

/**
 * MUI Angular Radio Component
 * @module angular/radio
 */
var moduleName = 'mui.radio';

_angular.default.module(moduleName, []).directive('muiRadio', function () {
  return {
    restrict: 'AE',
    replace: true,
    scope: {
      label: '@',
      name: '@',
      value: '@',
      ngChecked: '=',
      ngDisabled: '=',
      ngModel: '='
    },
    template: function template(tElement, tAttrs) {
      var isUndef = _angular.default.isUndefined,
          html = '';
      html += '<div class="mui-radio"><label><input type="radio" '; // input attributes

      html += 'name={{name}} ';
      html += 'value={{value}} ';
      html += 'ng-disabled="ngDisabled" '; // handle ngChecked and ngModel

      if (!isUndef(tAttrs.ngChecked)) html += 'ng-checked="ngChecked" ';
      if (!isUndef(tAttrs.ngModel)) html += 'ng-model="ngModel" ';
      html += '>{{label}}</label></div>';
      return html;
    }
  };
});
/** Define module API */


var _default = moduleName;
exports.default = _default;
module.exports = exports.default;