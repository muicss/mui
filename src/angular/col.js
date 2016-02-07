module.exports = angular.module('mui.col', [])
  .directive('muiCol', function() {
    return {
      restrict: 'AE',
      scope: true,
      replace: true,
      template: '<div></div>',
      transclude: true,
      link: function(scope, element, attrs, controller, linker) {
        linker(scope, function(clone) {
          element.append(clone);
        });
        var breakpoints = {
          'xs': 'mui-col-xs-',
          'sm': 'mui-col-sm-',
          'md': 'mui-col-md-',
          'lg': 'mui-col-lg-',
          'xs-offset': 'mui-col-xs-offset-',
          'sm-offset': 'mui-col-sm-offset-',
          'md-offset': 'mui-col-md-offset-',
          'lg-offset': 'mui-col-lg-offset-'
        };
        angular.forEach(breakpoints, function(value, key) {
          var temp = attrs[attrs.$normalize(key)];
          temp && element.addClass(value + temp);
        })
      }
    }
  })
