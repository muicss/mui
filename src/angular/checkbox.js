module.exports = angular.module('mui.checkbox', [])
  .directive('muiCheckbox', function() {
    return {
      restrict: 'AE',
      replace: true,
      require: ['?ngModel'],
      scope: {
        innerInput: '=?ngModel',
        label: '@',
        value: '@',
        ngDisabled: '=',
        select: '&?onSelect'
      },
      template: '<div class="mui-checkbox">' +
        '<label>' +
        '<input type="checkbox" ng-model="innerInput" ' +
        'value={{value}} ng-disabled="ngDisabled" ng-click="select()" ' +
        '>{{label}}</label> ' +
        '</div>'
    }
  })
