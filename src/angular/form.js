/**
 * MUI Angular Form Directive
 * @module angular/form
 */

import angular from 'angular';


const moduleName = 'mui.form';


angular.module(moduleName, [])
  .directive('muiFormInline', function() {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        element.addClass('mui-form--inline');
      }
    }
  });


/** Define module API */
export default moduleName;
