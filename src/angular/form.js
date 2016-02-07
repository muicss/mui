module.exports = angular.module('mui.form', [])
  .directive('formInline', function() {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        element.addClass('mui-form--inline');
      }
    }
  });
