angular.module('mui.panel',[])
  .directive('muiPanel', function() {
    return {
      restrict : 'AE',
      template : "<div class='mui-panel' ng-transclude></div>",
      transclude : true
    };
  });
