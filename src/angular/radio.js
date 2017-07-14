/**
 * MUI Angular Radio Component
 * @module angular/radio
 */

import angular from 'angular';


const moduleName = 'mui.radio';


angular.module(moduleName, [])
  .directive('muiRadio', function() {
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
      template: function(tElement, tAttrs) {
        var isUndef = angular.isUndefined,
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
    }
  });


/** Define module API */
export default moduleName;
