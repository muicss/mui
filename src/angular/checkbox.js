/**
 * MUI Angular Checkbox Component
 * @module angular/checkox
 */

import angular from 'angular';


const moduleName = 'mui.checkbox';


angular.module(moduleName, [])
  .directive('muiCheckbox', function() {
    return {
      restrict: 'AE',
      replace: true,
      require: ['?ngModel'],
      scope: {
        label: '@',
        name: '@',
        value: '@',
        ngModel: '=',
        ngDisabled: '='
      },
      template: '<div class="mui-checkbox">' +
        '<label>' +
        '<input type="checkbox" ' +
        'name={{name}} ' +
        'value={{value}} ' +
        'ng-model="ngModel" ' +
        'ng-disabled="ngDisabled" ' +
        '>{{label}}</label> ' +
        '</div>'
    }
  });


/** Define module API */
export default moduleName;
