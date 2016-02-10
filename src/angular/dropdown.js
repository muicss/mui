module.exports = angular.module('mui.dropdown', [])
  .directive('muiDropdown', function($timeout, $compile) {
    return {
      restrict: 'AE',
      transclude: true,
      replace : true,
      scope: {
        variant: '@', //['default', 'flat', 'raised', 'fab']
        color: '@', //['default', 'primary', 'danger', 'dark','accent']
        size: '@', //['default', 'small', 'large']
        open: '=?', //open ?
        disable: '=ngDisabled'
      },
      template: '<div class="mui-dropdown">' +
                  '<mui-button variant="{{variant}}" ng-disabled="disable" color="{{color}}" '+
                  'size="{{size}}"></mui-button>' +
                  '<ul class="mui-dropdown__menu" ng-transclude></ul>'+
                '</div>',
      link: function(scope, element, attrs) {
        var dropdownClass = 'mui-dropdown',
          menuClass = 'mui-dropdown__menu',
          openClass = 'mui--is-open',
          rightClass = 'mui-dropdown__menu--right',
          $menu,$muiButton;

        scope.open = scope.open || false;
        if (!angular.isUndefined(attrs.disabled) && angular.isUndefined(attrs.ngDisabled)) {
          scope.disable = true;
        }

        var _findMenuNode = function() {
          return angular.element(element[0].querySelector('.' + menuClass));
        };
        $menu = _findMenuNode().css('margin-top', '-3px');

        //menu right
        !angular.isUndefined(attrs.right) && $menu.addClass(rightClass);

        //html类型的 label
        attrs.$observe('label', function() {
          $muiButton = angular.element(element[0].querySelector('.mui-btn'));
          if (!angular.isUndefined(attrs.nocaret)) {
            $muiButton.html(attrs.label);
          } else {
            $muiButton.html(attrs.label + ' <mui-caret></mui-caret>');
          }
          $compile($muiButton.children())(scope);
        });

        scope.$watch('open', function() {
          $menu = _findMenuNode();
          scope.open ? $menu.addClass(openClass) : $menu.removeClass(openClass);
        });


        var toggleEvent = function(event) {
          var self = element[0].contains(event.target);
          /**
           * [_isLink description]
           * @return {Boolean} [description]
           */
          var _isLink = function() {
            var links = _findMenuNode()[0].querySelectorAll('a[href]'),
              bool = false;
            angular.forEach(links, function(link, index) {
              link.contains(event.target) && (bool = true);
            });
            return bool;
          };

          scope.$apply(function() {
            if (_isLink() || scope.disable) {
              return;
            }
            if (!self) {
              scope.open = false;
            } else {
              scope.open = !scope.open;
            }
          });
        };

        /**
         * document mousedown event
         */
        angular.element(document).on('mousedown', toggleEvent);

        scope.$on('$destroy', function() {
          angular.element(document).off('mousedown', toggleEvent);
        });

      }
    };
  });
