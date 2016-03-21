/**
 * MUI Angular DropdownItem Component
 * @module angular/dropdown-item
 */

module.exports = angular.module('mui.dropdown-item', [])
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
