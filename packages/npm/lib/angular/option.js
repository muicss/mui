var babelHelpers = require('./babel-helpers.js');
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = require('angular');

var _angular2 = babelHelpers.interopRequireDefault(_angular);

var _forms = require('../js/lib/forms');

var formlib = babelHelpers.interopRequireWildcard(_forms);

var _util = require('../js/lib/util');

var util = babelHelpers.interopRequireWildcard(_util);

var _jqLite = require('../js/lib/jqLite');

var jqLite = babelHelpers.interopRequireWildcard(_jqLite);
/**
 * MUI Angular Select Component
 * @module angular/select
 */

var moduleName = 'mui.option';

_angular2.default.module(moduleName, []).directive('muiOption', function () {
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
exports.default = moduleName;
module.exports = exports['default'];