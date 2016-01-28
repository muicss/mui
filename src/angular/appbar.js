module.exports = angular.module("mui.appbar",[])
  .directive('muiAppbar', function(){
    return{
      restrict : "AE",
      transclude : true,
      replace: true,
      template : "<div class='mui-appbar' ng-transclude></div>"
    };
  });
