var babelHelpers = require('./babel-helpers.js');
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = require('angular');

var _angular2 = babelHelpers.interopRequireDefault(_angular);

var moduleName = 'mui.container'; /**
                                   * MUI Angular Container Component
                                   * @module angular/container
                                   */

_angular2.default.module(moduleName, []).directive('muiContainer', function () {
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
      });

      // handle fluid containers
      if (!_angular2.default.isUndefined(attrs.fluid)) {
        element.removeClass('mui-container').addClass('mui-container-fluid');
      }
    }
  };
});

/** Define module API */
exports.default = moduleName;
module.exports = exports['default'];