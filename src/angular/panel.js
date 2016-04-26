/**
 * MUI Angular Panel Component
 * @module angular/panel
 */

import angular from 'angular';


const moduleName = 'mui.panel';


angular.module(moduleName, [])
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


/** Define module API */
export default moduleName;
