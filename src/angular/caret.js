/**
 * MUI Angular Caret Component
 * @module angular/caret
 */

import angular from 'angular';


const moduleName = 'mui.caret';


angular.module(moduleName, [])
  .directive('muiCaret', function() {
    return {
      restrict : 'AE',
      replace: true,
      template : '<span class="mui-caret"></span>',
      link: function(scope, element, attrs) {
        // caret direction
        if (!angular.isUndefined(attrs.direction)) {
          element.addClass('mui-caret--' + attrs['direction']);
        }
      }
    };
  });


/** Define module API */
export default moduleName;
