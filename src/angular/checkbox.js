module.exports = angular.module('mui.checkbox', [])
  .directive('muiCheckbox', function() {
    return {
      restrict: 'AE',
      replace: true,
      require: ['?ngModel'],
      scope: {
        innerInput: '=?ngModel',
        muiLabel: '@',
        name: '@',
        value: '@',
        ngDisabled: '=',
        select: '&?onSelect'
      },
      template: '<div class="mui-checkbox">' +
        '<label>' +
        '<input type="checkbox" ' +
        'ng-model="innerInput" ' +
        'value={{value}} ' +
        'name={{name}} ' +
        'ng-disabled="ngDisabled" ' +
        'ng-click="select()" ' +
        '>{{muiLabel}}</label> ' +
        '</div>'
    }
  })
