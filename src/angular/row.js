/**
 * MUI Angular Grid/Row Module
 * @module angular/row.js
 */

import angular from 'angular';


const moduleName = 'mui.row';


angular.module('mui.row', [])
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


/** Define module API */
export default moduleName;
