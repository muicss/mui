module.exports = angular.module('mui.caret',[])
  .directive('muiCaret', function() {
      return {
        restrict : 'AE',
        template : '<span class="mui-caret"></span>'
      };
  });
