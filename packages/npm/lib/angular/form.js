var babelHelpers = require('./babel-helpers.js');
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _angular = babelHelpers.interopRequireDefault(require("angular"));

/**
 * MUI Angular Form Directive
 * @module angular/form
 */
var moduleName = 'mui.form';

_angular.default.module(moduleName, []).directive('muiForm', function () {
  return {
    restrict: 'AE',
    template: '<form class="mui-form"></form>',
    transclude: true,
    scope: true,
    replace: true,
    link: function link(scope, element, attrs, controller, transcludeFn) {
      // use transcludeFn to pass ng-controller on parent element
      transcludeFn(scope, function (clone) {
        element.append(clone);
      }); // handle inline forms

      if (!_angular.default.isUndefined(attrs.inline)) {
        element.addClass('mui-form--inline');
      }
    }
  };
});
/** Define module API */


var _default = moduleName;
exports.default = _default;
module.exports = exports.default;