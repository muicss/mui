module.exports = angular.module('mui.row', [])
.directive('muiRow', function() {
  return {
    restrict : 'AE',
    scope : true,
    replace: true,
    template : "<div class='mui-row'></div>",
    transclude : true,
    link: function(scope, element, attr, controller, linker) {
      linker(scope, function(clone) {
        element.append(clone);
      });
    }
  }
})
