var babelHelpers = require('./babel-helpers.js');
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _angular = babelHelpers.interopRequireDefault(require("angular"));

/**
 * MUI Angular Container Component
 * @module angular/container
 */
var moduleName = 'mui.container';

_angular.default.module(moduleName, []).directive('muiContainer', function () {
  return {
    restrict: 'AE',
    template: '<div class="mui-container"></div>',
    transclude: true,
    scope: true,
    replace: true,
    link: function link(scope, element, attrs, controller, transcludeFn) {
      // use transcludeFn to pass ng-controller on parent element
      transcludeFn(scope, function (clone) {
        element.append(clone);
      }); // handle fluid containers

      if (!_angular.default.isUndefined(attrs.fluid)) {
        element.removeClass('mui-container').addClass('mui-container-fluid');
      }
    }
  };
});
/** Define module API */


var _default = moduleName;
exports.default = _default;
module.exports = exports.default;