module.exports = angular.module('mui.button', [])
  .directive('muiButton', function() {
    return {
      restrict: "AE",
      scope: {
        disable: '='
      },
      replace: true,
      template: "<button class='mui-btn' ng-disabled = 'disable' ripple ng-transclude></button>",
      transclude: true,
      link: function(scope, element, attrs) {
        var btnClass = "mui-btn",
          styles = {
            variant: 1, //['default', 'flat', 'raised', 'fab']
            color: 1, //['default', 'primary', 'danger', 'dark','accent']
            size: 1 //['default', 'small', 'large']
          };

        scope.type = scope.type || "button";

        /**
         * change btn-style by attrs
         */
        var _renderBtn = function() {
          element.removeAttr('class').addClass(btnClass);
          angular.forEach(styles, function(value, style) {
            element.addClass(attrs[style] ? 'mui-btn--' + attrs[style] : '');
          });
        };

        /**
         * observe each attr and rerender button
         */
        angular.forEach(styles, function(value, style) {
          attrs.$observe(style, function() {
            _renderBtn();
          });
        });

      }

    };
  })
  .directive('ripple', function($timeout, jqLite) {
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

          /**
           * ripple Dom position
           */
          var rippleStyle = {
            height: diameter + 'px',
            width: diameter + 'px',
            top: (yPos - radius) + 'px',
            left: (xPos - radius) + 'px'
          };

          var ripple = angular.element("<div></div>").addClass(rippleClass);
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
  })
  .factory('jqLite', function() {
    var gDoc = document,
      gDocEl = gDoc.documentElement,
      gWin = window;
    /**
     * Get or set vertical scroll position
     * @param {Element} element - The DOM element
     */
    function getScrollTop(element) {
      if (element === gWin) {
        return (gWin.pageYOffset || gDocEl.scrollTop) - (gDocEl.clientTop || 0);
      } else {
        return element.scrollTop;
      }
    }

    /**
     * Get or set horizontal scroll position
     * @param {Element} element - The DOM element
     */
    function getScrollLeft(element) {
      if (element === gWin) {
        return (gWin.pageXOffset || gDocEl.scrollLeft) - (gDocEl.clientLeft || 0);
      } else {
        return element.scrollLeft;
      }
    }

    /**
     * Get element position and size
     * @param {Element} element - The DOM element
     */
    function jqLiteOffset(element) {
      var rect = element.getBoundingClientRect(),
        scrollTop = getScrollTop(gWin),
        scrollLeft = getScrollLeft(gWin);

      return {
        top: rect.top + scrollTop,
        left: rect.left + scrollLeft,
        height: rect.height,
        width: rect.width
      };
    }

    return {
      offset: jqLiteOffset
    };

  });
