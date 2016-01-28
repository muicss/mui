module.exports = angular.module('mui.panel',[])
  .directive('muiPanel', function() {
    return {
      restrict : 'AE',
      replace: true,
      template : "<div class='mui-panel' ng-transclude></div>",
      transclude : true
    };
  });
