/**
 * MUI Angular Divider Component
 * @module angular/divider
 */

(function() {

angular.module('mui.divider', [])
  .directive('muiDivider', function() {
    return {
      restrict: 'AE',
      replace: true,
      compile: function(tElement, tAttrs) {
        tElement.addClass('mui-divider');
      }
    }
  });

})();