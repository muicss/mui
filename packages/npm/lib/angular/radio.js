var babelHelpers = require('./babel-helpers.js');
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = require('angular');

var _angular2 = babelHelpers.interopRequireDefault(_angular);

var moduleName = 'mui.radio'; /**
                               * MUI Angular Radio Component
                               * @module angular/radio
                               */

_angular2.default.module(moduleName, []).directive('muiRadio', function () {
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
      var isUndef = _angular2.default.isUndefined,
          html = '';

      html += '<div class="mui-radio"><label><input type="radio" ';

      // input attributes
      html += 'name={{name}} ';
      html += 'value={{value}} ';
      html += 'ng-disabled="ngDisabled" ';

      // handle ngChecked and ngModel
      if (!isUndef(tAttrs.ngChecked)) html += 'ng-checked="ngChecked" ';
      if (!isUndef(tAttrs.ngModel)) html += 'ng-model="ngModel" ';

      html += '>{{label}}</label></div>';

      return html;
    }
  };
});

/** Define module API */
exports.default = moduleName;
module.exports = exports['default'];