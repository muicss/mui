/**
 * MUI Angular Appbar Component
 * @module angular/appbar
 */

import angular from 'angular';


const moduleName = 'mui.appbar';


angular.module(moduleName, [])
  .directive('muiAppbar', function() {
    return {
      restrict: 'AE',
      transclude: true,
      replace: true,
      template: '<div class="mui-appbar"></div>',
      link: function(scope, element, attrs, controller, transcludeFn) {
        // use transcludeFn to pass ng-controller on parent element
        transcludeFn(scope, function(clone) {
          element.append(clone);
        });
      }
    };
  });


/** Define module API */
export default moduleName;
