/**
 * MUI Angular Checkbox Component
 * @module angular/checkox
 */

module.exports = angular.module('mui.checkbox', [])
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
