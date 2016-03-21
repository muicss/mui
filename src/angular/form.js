/**
 * MUI Angular Form Directive
 * @module angular/form
 */

module.exports = angular.module('mui.form', [])
  .directive('muiFormInline', function() {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        element.addClass('mui-form--inline');
      }
    }
  });
