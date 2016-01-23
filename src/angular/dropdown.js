angular.module('mui.dropdown', [])
  .directive('muiDropdown', function($timeout, $compile) {
    return {
      restrict: "AE",
      transclude: true,
      scope: {
        variant: '@', //['default', 'flat', 'raised', 'fab']
        color: '@', //['default', 'primary', 'danger', 'dark','accent']
        size: '@', //['default', 'small', 'large']
        open: '=?', //open ?
        disable: '='
      },
      template: "<div class='mui-dropdown'>" +
        "<mui-button variant='{{variant}}' disable='disable' color='{{color}}' size='{{size}}'></mui-button>" +
        "<ul class='mui-dropdown__menu' ng-transclude></ul></div>",

      compile: function(tElement, tAttrs) {
        var dropdownClass = 'mui-dropdown',
          menuClass = 'mui-dropdown__menu',
          openClass = 'mui--is-open',
          rightClass = 'mui-dropdown__menu--right',
          $menu = angular.element(tElement[0].querySelector('.' + menuClass));
          $menu.css("margin-top", '-3px');

        /**
         * remove caret if nocaret attribute found
         */
        // !angular.isUndefined(tAttrs.nocaret) && tElement.find('mui-caret').remove();
        /**
         * menu right
         */
        !angular.isUndefined(tAttrs.right) && $menu.addClass(rightClass);

        /**
         * return link
         */
        return function(scope, element, attrs) {
          scope.open = scope.open || false;

          /**
           * enable html type label
           */
          attrs.$observe('label', function() {
            var $muiButton = element.find('mui-button');
            if (!angular.isUndefined(attrs.nocaret)) {
              $muiButton.html(tAttrs.label);
            } else {
              $muiButton.html(tAttrs.label + ' <mui-caret></mui-caret>');
            }
            $compile($muiButton)(scope);
          });

          scope.$watch('open', function() {
            var $menu = angular.element(element[0].querySelector('.' + menuClass));
            scope.open ? $menu.addClass(openClass) : $menu.removeClass(openClass);
          });


          var toggleEvent = function(event) {
            var self = element[0].contains(event.target),
                $menu = angular.element(element[0].querySelector('.' + menuClass));
            /**
             * [_isLink description]
             * @return {Boolean} [description]
             */
            var _isLink = function() {
              var links = $menu[0].querySelectorAll('a[href]'),
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

        };
      }
    };
  });
