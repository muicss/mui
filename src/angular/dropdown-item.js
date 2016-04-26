/**
 * MUI Angular DropdownItem Component
 * @module angular/dropdown-item
 */

import angular from 'angular';


const moduleName = 'mui.dropdown-item';


angular.module(moduleName, [])
  .directive('muiDropdownItem', function() {
    return {
      restrict: 'AE',
      replace: true,
      scope: {
        link: '@'
      },
      transclude: true,
      template: '<li><a href="{{link}}" ng-transclude></a></li>'
    };
  });


/** Define module API */
export default moduleName;
