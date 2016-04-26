/**
 * MUI Angular Dropdown Component
 * @module angular/dropdown
 */

import angular from 'angular';


const moduleName = 'mui.dropdown';


angular.module(moduleName, [])
  .directive('muiDropdown', ['$timeout', '$compile', function($timeout, $compile) {
    return {
      restrict: 'AE',
      transclude: true,
      replace : true,
      scope: {
        variant: '@',
        color: '@',
        size: '@',
        open: '=?',
        ngDisabled: '='
      },
      template: '<div class="mui-dropdown">' +
        '<mui-button ' +
        'variant="{{variant}}" ' + 
        'color="{{color}}" ' +
        'size="{{size}}" ' +
        'ng-click="onClick($event);" ' +
        '></mui-button>' +
        '<ul class="mui-dropdown__menu" ng-transclude></ul>'+
        '</div>',
      link: function(scope, element, attrs) {
        var dropdownClass = 'mui-dropdown',
            menuClass = 'mui-dropdown__menu',
            openClass = 'mui--is-open',
            rightClass = 'mui-dropdown__menu--right',
            isUndef = angular.isUndefined,
            menuEl,
            buttonEl;

        // save references
        menuEl = angular.element(element[0].querySelector('.' + menuClass));
        buttonEl = angular.element(element[0].querySelector('.mui-btn'));

        menuEl.css('margin-top', '-3px');

        // handle is-open
        if (!isUndef(attrs.open)) scope.open = true;

        // handle disabled
        if (!isUndef(attrs.disabled)) {
          buttonEl.attr('disabled', true);
        }

        // handle right-align
        if (!isUndef(attrs.rightAlign)) menuEl.addClass(rightClass);

        // handle no-caret
        if (!isUndef(attrs.noCaret)) buttonEl.html(attrs.label);
        else buttonEl.html(attrs.label + ' <mui-caret></mui-caret>'); 

        function closeDropdownFn() {
          scope.open = false;
          scope.$apply();
        }

        // handle menu open
        scope.$watch('open', function(newValue) {
          if (newValue === true) {
            menuEl.addClass(openClass);
            document.addEventListener('click', closeDropdownFn);
          } else if (newValue === false) {
            menuEl.removeClass(openClass);
            document.removeEventListener('click', closeDropdownFn);
          }
        });

        // click handler
        scope.onClick = function($event) {
          // exit if disabled
          if (scope.disabled) return;

          // prevent form submission
          $event.preventDefault();
          $event.stopPropagation();

          // toggle open 
          if (scope.open) scope.open = false;
          else scope.open = true;
        };
      }
    };
  }]);


/** Define module API */
export default moduleName;
