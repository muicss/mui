module.exports = angular.module('mui.divider', [])
  .directive('muiDivider', function() {
    return {
      restrict: 'AE',
      replace: true,
      compile: function(tElement, tAttrs) {
        tElement.addClass('mui-divider');
      }
    }
  })
  .directive('dividerTop', function() {
    return {
      restrict: 'A',
      compile: function(tElement, tAttrs) {
        tElement.addClass('mui--divider-top');
      }
    }
  })
  .directive('dividerBottom', function() {
    return {
      restrict: 'A',
      compile: function(tElement, tAttrs) {
        tElement.addClass('mui--divider-bottom');
      }
    }
  })
  .directive('dividerLeft', function() {
    return {
      restrict: 'A',
      compile: function(tElement, tAttrs) {
        tElement.addClass('mui--divider-left');
      }
    }
  })
  .directive('dividerRight', function() {
    return {
      restrict: 'A',
      compile: function(tElement, tAttrs) {
        tElement.addClass('mui--divider-right');
      }
    }
  });
