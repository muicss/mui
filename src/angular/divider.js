/**
 * MUI Angular Divider Component
 * @module angular/divider
 */

import angular from 'angular';


const moduleName = 'mui.divider';


angular.module(moduleName, [])
  .directive('muiDivider', function() {
    return {
      restrict: 'AE',
      replace: true,
      compile: function(tElement, tAttrs) {
        tElement.addClass('mui-divider');
      }
    }
  });


/** Define module API */
export default moduleName;
