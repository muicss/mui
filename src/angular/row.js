module.exports = angular.module('mui.row', [])
.directive('muiRow', function() {
  return {
    restrict : 'AE',
    scope : true,
    replace: true,
    template : "<div class='mui-row' ng-transclude></div>",
    transclude : true
  }
})
