module.exports = angular.module('mui.radio', [])
  .directive('muiRadio', function() {
    return {
      restrict: 'AE',
      replace: true,
      require: ['?ngModel'],
      scope: {
        innerInput: '=?ngModel',
        muiLabel: '@',
        name: '@',
        value: '@',
        ngDisabled : '=',
        select: '&?onSelect'
      },
      template: '<div class="mui-radio">' +
        '<label>' +
        '<input type="radio" ' +
        'ng-model="innerInput" ' +
        'name={{name}} ' +
        'value={{value}} ' +
        'ng-disabled="ngDisabled" '+
        'ng-click="select()" ' +
        '>{{muiLabel}}</label> ' +
        '</div>'
    }
  })
