/**
 * MUI Angular Caret Component
 * @module angular/caret
 */

module.exports = angular.module('mui.caret',[])
  .directive('muiCaret', function() {
    return {
      restrict : 'AE',
      replace: true,
      template : '<span class="mui-caret"></span>'
    };
  });
