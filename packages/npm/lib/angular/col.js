var babelHelpers = require('./babel-helpers.js');
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = require('angular');

var _angular2 = babelHelpers.interopRequireDefault(_angular);

var moduleName = 'mui.col'; /**
                             * MUI Angular Col (Grid) Component
                             * @module angular/col
                             */

_angular2.default.module(moduleName, []).directive('muiCol', function () {
  return {
    restrict: 'AE',
    scope: true,
    replace: true,
    template: '<div></div>',
    transclude: true,
    link: function link(scope, element, attrs, controller, transcludeFn) {
      // use transcludeFn to pass ng-controller on parent element
      transcludeFn(scope, function (clone) {
        element.append(clone);
      });

      // iterate through breakpoints
      var breakpoints = {
        'xs': 'mui-col-xs-',
        'sm': 'mui-col-sm-',
        'md': 'mui-col-md-',
        'lg': 'mui-col-lg-',
        'xl': 'mui-col-xl-',
        'xs-offset': 'mui-col-xs-offset-',
        'sm-offset': 'mui-col-sm-offset-',
        'md-offset': 'mui-col-md-offset-',
        'lg-offset': 'mui-col-lg-offset-',
        'xl-offset': 'mui-col-xl-offset-'
      };

      _angular2.default.forEach(breakpoints, function (value, key) {
        var attrVal = attrs[attrs.$normalize(key)];
        if (attrVal) element.addClass(value + attrVal);
      });
    }
  };
});

/** Define module API */
exports.default = moduleName;
module.exports = exports['default'];