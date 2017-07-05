/**
 * MUI Angular Form Directive
 * @module angular/form
 */

import angular from 'angular';


const moduleName = 'mui.form';


angular.module(moduleName, [])
  .directive('muiForm', function() {
    return {
      restrict: 'AE',
      template: '<form class="mui-form"></form>',
      transclude: true,
      scope: true,
      replace: true,
      link: function(scope, element, attrs, controller, transcludeFn) {
        // use transcludeFn to pass ng-controller on parent element
        transcludeFn(scope, function(clone) {
          element.append(clone);
        });

        // handle inline forms
        if (!angular.isUndefined(attrs.inline)) {
          element.addClass('mui-form--inline');
        }
      }
    };
  });


/** Define module API */
export default moduleName;
