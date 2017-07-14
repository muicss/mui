var babelHelpers = require('./babel-helpers.js');
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = require('angular');

var _angular2 = babelHelpers.interopRequireDefault(_angular);

var moduleName = 'mui.checkbox'; /**
                                  * MUI Angular Checkbox Component
                                  * @module angular/checkox
                                  */

_angular2.default.module(moduleName, []).directive('muiCheckbox', ['$parse', function () {
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

      html += '<div class="mui-checkbox"><label><input type="checkbox" ';

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
}]);

/** Define module API */
exports.default = moduleName;
module.exports = exports['default'];