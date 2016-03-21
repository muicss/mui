/**
 * MUI Angular Panel Component
 * @module angular/panel
 */

module.exports = angular.module('mui.panel', [])
  .directive('muiPanel', function() {
    return {
      restrict: 'AE',
      replace: true,
      scope : true,
      template: '<div class="mui-panel"></div>',
      transclude: true,
      link: function(scope, element, attr, controller, transcludeFn) {
        transcludeFn(scope, function(clone) {
          element.append(clone);
        });
      }
    };
  });
