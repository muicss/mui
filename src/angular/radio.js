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
      require: ['?ngModel'],
      scope: {
        label: '@',
        name: '@',
        value: '@',
        ngModel: '=',
        ngDisabled: '='
      },
      template: '<div class="mui-radio">' +
        '<label>' +
        '<input type="radio" ' +
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
