/**
 * MUI Angular Container Component
 * @module angular/container
 */

import angular from 'angular';


const moduleName = 'mui.container';


angular.module(moduleName, [])
  .directive('muiContainer', function() {
    return {
      restrict: 'AE',
      template: '<div class="mui-container"></div>',
      transclude: true,
      scope: true,
      replace: true,
      link: function(scope, element, attrs, controller, transcludeFn) {
        // use transcludeFn to pass ng-controller on parent element
        transcludeFn(scope, function(clone) {
          element.append(clone);
        });

        // handle fluid containers
        if (!angular.isUndefined(attrs.fluid)){
          element.removeClass('mui-container').addClass('mui-container-fluid');
        }
      }
    };
  });


/** Define module API */
export default moduleName;
