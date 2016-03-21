/**
 * MUI Angular Radio Component
 * @module angular/radio
 */

module.exports = angular.module('mui.radio', [])
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
