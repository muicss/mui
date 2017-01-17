var babelHelpers = require('./babel-helpers.js');
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = require('angular');

var _angular2 = babelHelpers.interopRequireDefault(_angular);

var moduleName = 'mui.form'; /**
                              * MUI Angular Form Directive
                              * @module angular/form
                              */

_angular2.default.module(moduleName, []).directive('muiForm', function () {
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
      });

      // handle inline forms
      if (!_angular2.default.isUndefined(attrs.inline)) {
        element.addClass('mui-form--inline');
      }
    }
  };
});

/** Define module API */
exports.default = moduleName;
module.exports = exports['default'];