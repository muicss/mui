var babelHelpers = require('./babel-helpers.js');
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _angular = babelHelpers.interopRequireDefault(require("angular"));

/**
 * MUI Angular Dropdown Component
 * @module angular/dropdown
 */
var moduleName = 'mui.dropdown';

_angular.default.module(moduleName, []).directive('muiDropdown', ['$timeout', '$compile', function ($timeout, $compile) {
  return {
    restrict: 'AE',
    transclude: true,
    replace: true,
    scope: {
      variant: '@',
      color: '@',
      size: '@',
      open: '=?',
      placement: '@',
      alignment: '@',
      ngDisabled: '='
    },
    template: '<div class="mui-dropdown">' + '<mui-button ' + 'variant="{{variant}}" ' + 'color="{{color}}" ' + 'size="{{size}}" ' + 'ng-click="onClick($event);" ' + '></mui-button>' + '<ul class="mui-dropdown__menu" ng-transclude></ul>' + '</div>',
    link: function link(scope, element, attrs) {
      var dropdownClass = 'mui-dropdown',
          menuClass = 'mui-dropdown__menu',
          openClass = 'mui--is-open',
          rightClass = 'mui-dropdown__menu--right',
          isUndef = _angular.default.isUndefined,
          menuEl,
          buttonEl,
          contents; // save references

      menuEl = _angular.default.element(element[0].querySelector('.' + menuClass));
      buttonEl = _angular.default.element(element[0].querySelector('.mui-btn')); // handle is-open

      if (!isUndef(attrs.open)) scope.open = true; // handle disabled

      if (!isUndef(attrs.disabled)) {
        buttonEl.attr('disabled', true);
      } // placement class


      if (!isUndef(attrs.placement)) {
        element.addClass(dropdownClass + '--' + attrs.placement);
      } // alignment class


      if (!isUndef(attrs.rightAlign)) {
        // legacy `rightAlign` attribute
        menuEl.addClass(rightClass);
      } else if (!isUndef(attrs.alignment)) {
        menuEl.addClass(menuClass + '--' + attrs.alignment);
      } // handle caret


      if (!isUndef(attrs.noCaret)) {
        // no caret
        buttonEl.html(attrs.label);
      } else {
        // caret direction and placement
        contents = '<mui-caret direction="{{placement}}"></mui-caret>';
        contents = $compile(contents)(scope);

        if (scope.placement === 'left') {
          buttonEl.append(contents).append(attrs.label + ' ');
        } else {
          buttonEl.append(attrs.label + ' ').append(contents);
        }
      }

      function closeDropdownFn() {
        scope.open = false;
        scope.$apply();
      }

      function handleKeyDownFn(ev) {
        // close dropdown on escape key
        var key = ev.key;
        if (key === 'Escape' || key === 'Esc') closeDropdownFn();
      } // handle menu open


      scope.$watch('open', function (newValue) {
        var doc = document,
            pos = {},
            wrapperRect,
            toggleRect;

        if (newValue === true) {
          // menu placement
          wrapperRect = element[0].getBoundingClientRect();
          toggleRect = buttonEl[0].getBoundingClientRect();

          switch (attrs.placement) {
            case 'up':
              pos.bottom = toggleRect.height + toggleRect.top - wrapperRect.top + 'px';
              break;

            case 'right':
              pos.left = toggleRect.width + 'px';
              pos.top = toggleRect.top - wrapperRect.top + 'px';
              break;

            case 'left':
              pos.right = toggleRect.width + 'px';
              pos.top = toggleRect.top - wrapperRect.top + 'px';
              break;

            default:
              pos.top = toggleRect.top - wrapperRect.top + toggleRect.height + 'px';
          } // menu alignment


          if (attrs.alignment === 'bottom') {
            pos.top = 'auto';
            pos.bottom = toggleRect.top - wrapperRect.top + 'px';
          } // set menu position


          menuEl.css(pos); // open menu

          menuEl.addClass(openClass);
          doc.addEventListener('click', closeDropdownFn);
          doc.addEventListener('keydown', handleKeyDownFn);
        } else if (newValue === false) {
          menuEl.removeClass(openClass);
          doc.removeEventListener('click', closeDropdownFn);
          doc.removeEventListener('keydown', handleKeyDownFn);
        }
      }); // click handler

      scope.onClick = function ($event) {
        // exit if disabled
        if (scope.disabled) return; // prevent form submission

        $event.preventDefault();
        $event.stopPropagation(); // toggle open 

        if (scope.open) scope.open = false;else scope.open = true;
      };
    }
  };
}]);
/** Define module API */


var _default = moduleName;
exports.default = _default;
module.exports = exports.default;