var babelHelpers = require('./babel-helpers.js');
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = require('angular');

var _angular2 = babelHelpers.interopRequireDefault(_angular);

var moduleName = 'mui.dropdown'; /**
                                  * MUI Angular Dropdown Component
                                  * @module angular/dropdown
                                  */

_angular2.default.module(moduleName, []).directive('muiDropdown', ['$timeout', '$compile', function ($timeout, $compile) {
  return {
    restrict: 'AE',
    transclude: true,
    replace: true,
    scope: {
      variant: '@',
      color: '@',
      size: '@',
      open: '=?',
      ngDisabled: '='
    },
    template: '<div class="mui-dropdown">' + '<mui-button ' + 'variant="{{variant}}" ' + 'color="{{color}}" ' + 'size="{{size}}" ' + 'ng-click="onClick($event);" ' + '></mui-button>' + '<ul class="mui-dropdown__menu" ng-transclude></ul>' + '</div>',
    link: function link(scope, element, attrs) {
      var dropdownClass = 'mui-dropdown',
          menuClass = 'mui-dropdown__menu',
          openClass = 'mui--is-open',
          rightClass = 'mui-dropdown__menu--right',
          isUndef = _angular2.default.isUndefined,
          menuEl,
          buttonEl;

      // save references
      menuEl = _angular2.default.element(element[0].querySelector('.' + menuClass));
      buttonEl = _angular2.default.element(element[0].querySelector('.mui-btn'));

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
      if (!isUndef(attrs.noCaret)) buttonEl.html(attrs.label);else buttonEl.html(attrs.label + ' <mui-caret></mui-caret>');

      function closeDropdownFn() {
        scope.open = false;
        scope.$apply();
      }

      // handle menu open
      scope.$watch('open', function (newValue) {
        if (newValue === true) {
          menuEl.addClass(openClass);
          document.addEventListener('click', closeDropdownFn);
        } else if (newValue === false) {
          menuEl.removeClass(openClass);
          document.removeEventListener('click', closeDropdownFn);
        }
      });

      // click handler
      scope.onClick = function ($event) {
        // exit if disabled
        if (scope.disabled) return;

        // prevent form submission
        $event.preventDefault();
        $event.stopPropagation();

        // toggle open 
        if (scope.open) scope.open = false;else scope.open = true;
      };
    }
  };
}]);

/** Define module API */
exports.default = moduleName;
module.exports = exports['default'];