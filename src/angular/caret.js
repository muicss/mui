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
      template : '<span class="mui-caret"></span>'
    };
  });


/** Define module API */
export default moduleName;
