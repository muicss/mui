module.exports = angular.module('mui.appbar', [])
  .directive('muiAppbar', function() {
    return {
      restrict: 'AE',
      transclude: true,
      replace: true,
      template: '<div class="mui-appbar"></div>',
      link: function(scope, element, attr, controller, linker) {
        linker(scope, function(clone) {
          element.append(clone);
        });
      }
    };
  });
