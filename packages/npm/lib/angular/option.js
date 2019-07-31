var babelHelpers = require('./babel-helpers.js');
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _angular = babelHelpers.interopRequireDefault(require("angular"));

var formlib = babelHelpers.interopRequireWildcard(require("../js/lib/forms"));
var util = babelHelpers.interopRequireWildcard(require("../js/lib/util"));
var jqLite = babelHelpers.interopRequireWildcard(require("../js/lib/jqLite"));

/**
 * MUI Angular Select Component
 * @module angular/select
 */
var moduleName = 'mui.option';

_angular.default.module(moduleName, []).directive('muiOption', function () {
  return {
    restrict: 'AE',
    replace: true,
    //require: '^muiSelect',
    scope: {
      label: '@',
      value: '@',
      ngDisabled: '='
    },
    template: '<option>{{label}}</option>',
    link: function link(scope, element, attrs, controller) {
      /*
      // register
      controller.addMenuItem({
        label: attrs.label,
        value: attrs.value,
        disabled: scope.ngDisabled,
        hidden: attrs.hidden
      });
       // destroy hook
      scope.$on('$destroy', function() {
        controller.removeMenuItem(attrs.value);
      });
      */
    }
  };
});
/** Define module API */


var _default = moduleName;
exports.default = _default;
module.exports = exports.default;