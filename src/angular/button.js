var jqLite = require('../js/lib/jqLite');
module.exports = angular.module('mui.button', [])
  .directive('muiButton', function() {
    return {
      restrict: 'AE',
      scope: {},
      replace: true,
      template: '<button class="mui-btn" ripple ng-transclude></button>',
      transclude: true,
      link: function(scope, element, attrs) {
        var btnClass = 'mui-btn',
          styles = {
            variant: 1, //['default', 'flat', 'raised', 'fab']
            color: 1, //['default', 'primary', 'danger', 'dark','accent']
            size: 1 //['default', 'small', 'large']
          };

        scope.type = scope.type || 'button';

        //如果仅存在disabled 属性而没有 ngDisabled 设置ngDisabled = true
        if (!angular.isUndefined(attrs.disabled) && angular.isUndefined(attrs.ngDisabled)) {
          element.prop('disabled', true);
        }

        //change btn-style by attrs
        var _renderBtn = function() {
          element.removeAttr('class').addClass(btnClass);
          angular.forEach(styles, function(value, style) {
            element.addClass(attrs[style] ? 'mui-btn--' + attrs[style] : '');
          });
        };

        //observe each attr and rerender button
        angular.forEach(styles, function(value, style) {
          attrs.$observe(style, function() {
            _renderBtn();
          });
        });

      }

    };
  })
  .directive('ripple', function($timeout) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        var rippleClass = 'mui-ripple-effect';

        /**
         * onmousedown ripple effect
         * @param  {event} mousedown event
         */
        element.on('mousedown', function(event) {
          if (element.prop('disabled')) return;

          var offset = jqLite.offset(element[0]),
            xPos = event.pageX - offset.left,
            yPos = event.pageY - offset.top,
            diameter,
            radius;

          diameter = offset.height;
          if (element.hasClass('mui-btn--fab')) diameter = offset.height / 2;
          radius = diameter / 2;

          // ripple Dom position
          var rippleStyle = {
            height: diameter + 'px',
            width: diameter + 'px',
            top: (yPos - radius) + 'px',
            left: (xPos - radius) + 'px'
          };

          var ripple = angular.element('<div></div>').addClass(rippleClass);
          for (var style in rippleStyle) {
            ripple.css(style, rippleStyle[style]);
          }

          element.append(ripple);
          $timeout(function() {
            ripple.remove();
          }, 2000);

        });
      }
    };
  });
