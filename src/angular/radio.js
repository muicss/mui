module.exports = angular.module('mui.radio', [])
  .directive('muiRadio', function() {
    return {
      restrict: 'AE',
      replace: true,
      require: ['?ngModel'],
      scope: {
        innerInput: '=?ngModel',
        label: '@',
        value: '@',
        ngDisabled : '=',
        select: '&?onSelect'
      },
      template: '<div class="mui-radio">' +
        '<label>' +
        '<input type="radio" ng-model="innerInput" ' +
        'value={{value}} ng-disabled="ngDisabled" ng-click="select()" ' +
        '>{{label}}</label> ' +
        '</div>'
    }
  })
