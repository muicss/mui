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

_angular2.default.module(moduleName, []).directive('muiFormInline', function () {
  return {
    restrict: 'A',
    link: function link(scope, element, attrs) {
      element.addClass('mui-form--inline');
    }
  };
});

/** Define module API */
exports.default = moduleName;
module.exports = exports['default'];