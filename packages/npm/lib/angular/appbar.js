var babelHelpers = require('./babel-helpers.js');
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = require('angular');

var _angular2 = babelHelpers.interopRequireDefault(_angular);

var moduleName = 'mui.appbar'; /**
                                * MUI Angular Appbar Component
                                * @module angular/appbar
                                */

_angular2.default.module(moduleName, []).directive('muiAppbar', function () {
  return {
    restrict: 'AE',
    transclude: true,
    replace: true,
    template: '<div class="mui-appbar"></div>',
    link: function link(scope, element, attrs, controller, transcludeFn) {
      // use transcludeFn to pass ng-controller on parent element
      transcludeFn(scope, function (clone) {
        element.append(clone);
      });
    }
  };
});

/** Define module API */
exports.default = moduleName;
module.exports = exports['default'];