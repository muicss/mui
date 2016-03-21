/**
 * MUI Angular Grid/Row Module
 * @module angular/row.js
 */

module.exports = angular.module('mui.row', [])
  .directive('muiRow', function() {
    return {
      restrict: 'AE',
      scope: true,
      replace: true,
      template: '<div class="mui-row"></div>',
      transclude: true,
      link: function(scope, element, attr, controller, transcludeFn) {
        transcludeFn(scope, function(clone) {
          element.append(clone);
        });
      }
    };
  });
