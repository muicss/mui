var babelHelpers = require('./babel-helpers.js');
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = require('angular');

var _angular2 = babelHelpers.interopRequireDefault(_angular);

var _forms = require('../js/lib/forms');

var formlib = babelHelpers.interopRequireWildcard(_forms);

var _util = require('../js/lib/util');

var util = babelHelpers.interopRequireWildcard(_util);

var _jqLite = require('../js/lib/jqLite');

var jqLite = babelHelpers.interopRequireWildcard(_jqLite);
/**
 * MUI Angular Select Component
 * @module angular/select
 */

var moduleName = 'mui.select';

_angular2.default.module(moduleName, []).directive('muiSelect', ['$timeout', function ($timeout) {
  return {
    restrict: 'AE',
    require: ['ngModel'],
    scope: {
      label: '@',
      name: '@',
      placeholder: '@',
      ngDisabled: '=',
      ngModel: '=',
      ngRequired: '='
    },
    replace: true,
    transclude: true,
    template: '<div class="mui-select" ' + 'ng-blur="onWrapperBlurOrFocus($event)" ' + 'ng-click="onWrapperClick($event)" ' + 'ng-focus="onWrapperBlurOrFocus($event)" ' + 'ng-keydown="onWrapperKeydown($event)" ' + 'ng-keypress="onWrapperKeypress($event)">' + '<select ' + 'name="{{name}}" ' + 'ng-class=\'{"mui--text-placeholder": placeholder && ngModel == ""}\' ' + 'ng-disabled="ngDisabled" ' + 'ng-model="ngModel" ' + 'ng-mousedown="onInnerMousedown($event)" ' + 'ng-required="ngRequired" ' + '>' + '<option ng-if="placeholder" value="" placeholder>{{placeholder}}</option>' + '</select>' + '<label tabindex="-1">{{label}}</label>' + '<div ' + 'class="mui-select__menu"' + 'ng-if="!useDefault && isOpen">' + '<div ' + 'ng-click="chooseOption($event, option)" ' + 'ng-repeat="option in selectEl.children() track by $index" ' + 'ng-class=\'{"mui--is-selected": $index === menuIndex, "mui--text-placeholder": option.hasAttribute("placeholder"), "mui--is-disabled": option.disabled}\' ' + 'ng-disabled="option.disabled" ' + 'ng-hide="option.hidden" ' + '>{{option.innerText}}</div>' + '</div>' + '</div>',
    link: function link(scope, element, attrs, controller, transcludeFn) {
      var wrapperEl = element,
          selectEl = element.find('select'),
          isUndef = _angular2.default.isUndefined,
          origValue;

      // disable MUI js
      selectEl[0]._muiSelect = true;

      // init scope
      scope.selectEl = selectEl;
      scope.isOpen = false;
      scope.useDefault = 'ontouchstart' in document.documentElement ? true : false;
      scope.origTabIndex = selectEl[0].tabIndex;
      scope.menuIndex = 0;
      scope.q = '';
      scope.qTimeout = null;

      // handle `use-default` attribute
      if (!isUndef(attrs.useDefault)) scope.useDefault = true;

      // use tabIndex to make wrapper or inner focusable
      if (scope.useDefault === false) {
        wrapperEl.prop('tabIndex', '0');
        selectEl.prop('tabIndex', '-1');
      } else {
        wrapperEl.prop('tabIndex', '-1');
        selectEl.prop('tabIndex', '0');
      }

      // add <option> tags to <select>
      transcludeFn(function (clone) {
        selectEl.append(clone);
      });

      function dispatchChange(option) {
        selectEl[0].selectedIndex = option.index;

        if (option.value !== origValue) {
          scope.ngModel = option.value;

          // trigger change event
          $timeout(function () {
            util.dispatchEvent(selectEl[0], 'change', true, false);
          });
        }
      }

      /**
       * Handle blur and focus events on wrapper <div> element.
       * @param {Event} $event - Angular event instance
       */
      scope.onWrapperBlurOrFocus = function ($event) {
        // ignore events that bubbled up
        if (document.activeElement !== wrapperEl[0]) return;

        util.dispatchEvent(selectEl[0], $event.type, false, false);
      };

      /**
       * Handle click event on wrapper <div> element.
       * @param {Event} $event - Angular event instance
       */
      scope.onWrapperClick = function ($event) {
        // only left click, check default prevented and useDefault
        if ($event.button !== 0 || $event.defaultPrevented || scope.useDefault || selectEl[0].disabled) {
          return;
        }

        // focus wrapper
        wrapperEl[0].focus();

        // open custom menu
        scope.isOpen = true;
      };

      /**
       * Handle keydown event on wrapper element.
       * @param {Event} $event - Angular event instance
       */
      scope.onWrapperKeydown = function ($event) {
        // exit if preventDefault() was called or useDefault is true
        if ($event.defaultPrevented || scope.useDefault) return;

        var keyCode = $event.keyCode;

        if (scope.isOpen === false) {
          // spacebar, down, up
          if (keyCode === 32 || keyCode === 38 || keyCode === 40) {
            // prevent win scroll
            $event.preventDefault();

            // open menu
            scope.isOpen = true;
          }
        } else {
          // tab
          if (keyCode === 9) return scope.isOpen = false;

          // escape | up | down | enter
          if (keyCode === 27 || keyCode === 40 || keyCode === 38 || keyCode === 13) {
            $event.preventDefault();
          }

          var options = selectEl.children(),
              nextIndex = null,
              i;

          if (keyCode === 27) {
            // escape -> close
            scope.isOpen = false;
          } else if (keyCode === 40) {
            // down -> increment
            i = scope.menuIndex + 1;
            while (i < options.length) {
              // exit if option not disabled
              if (!options[i].disabled && !options[i].hidden) {
                nextIndex = i;
                break;
              }
              i += 1;
            }

            if (nextIndex !== null) scope.menuIndex = nextIndex;
          } else if (keyCode === 38) {
            // up -> decrement
            i = scope.menuIndex - 1;
            while (i > -1) {
              // exit if option not disabled
              if (!options[i].disabled && !options[i].hidden) {
                nextIndex = i;
                break;
              }
              i -= 1;
            }

            if (nextIndex !== null) scope.menuIndex = nextIndex;
          } else if (keyCode === 13) {
            // enter -> choose and close
            dispatchChange(options[scope.menuIndex]);
            scope.isOpen = false;
          }
        }
      };

      /**
       * Handle keypress event on wrapper element.
       * @param {Event} $event - Angular event instance
       */
      scope.onWrapperKeypress = function ($event) {
        // exit if preventDefault() was called or useDefault is true or
        // menu is closed
        if ($event.defaultPrevented || scope.useDefault || !scope.isOpen) {
          return;
        }

        // handle query timer
        clearTimeout(scope.qTimeout);
        scope.q += $event.key;
        scope.qTimeout = setTimeout(function () {
          scope.q = '';
        }, 600);

        // select first match alphabetically
        var prefixRegex = new RegExp('^' + scope.q, 'i'),
            options = selectEl.children(),
            m = options.length,
            option,
            i;

        for (i = 0; i < m; i++) {
          option = options[i];
          if (!option.hidden && !option.disabled && prefixRegex.test(option.innerText)) {
            scope.menuIndex = option.index;
            break;
          }
        }
      };

      /**
       * Handle mousedown event on Inner <select> element
       * @param {Event} $event - Angular event instance
       */
      scope.onInnerMousedown = function ($event) {
        // check flag
        if ($event.button !== 0 || scope.useDefault === true) return;

        // prevent built-in menu from opening
        $event.preventDefault();
      };

      /**
       * Choose option the user selected.
       * @param {Object} option - The option selected.
       */
      scope.chooseOption = function ($event, option) {
        // prevent bubbling
        $event.stopImmediatePropagation();

        // ignore disabled
        if (option.disabled) return;

        // dispatch change
        dispatchChange(option);

        // close menu
        scope.isOpen = false;
      };

      // function to close menu on window resize and document click
      function closeMenuFn() {
        scope.isOpen = false;

        // disable scroll lock
        util.disableScrollLock(true);

        // remove event handlers
        jqLite.off(document, 'click', closeMenuFn);
        jqLite.off(window, 'resize', closeMenuFn);

        scope.$digest();
      }

      /**
       * Open/Close custom select menu
       */
      scope.$watch('isOpen', function (isOpen, oldVal) {
        // ignore first call
        if (isOpen === oldVal) return;

        // exit if use-default is true
        if (scope.useDefault === true) return;

        if (isOpen === true) {
          // enable scroll lock
          util.enableScrollLock();

          // init menuIndex
          var menuEl = element.find('div'),
              value = scope.ngModel,
              options = selectEl.children(),
              m = options.length,
              i;

          origValue = scope.ngModel;
          scope.menuIndex = scope.menuIndex;

          $timeout(function () {
            // set position of custom menu
            var props = formlib.getMenuPositionalCSS(element[0], menuEl[0], scope.menuIndex);

            props.height = 'auto';
            menuEl.css(props);
            jqLite.scrollTop(menuEl[0], props.scrollTop);

            // attach event handlers
            jqLite.on(document, 'click', closeMenuFn);
            jqLite.on(window, 'resize', closeMenuFn);
          });
        } else {
          // focus select element
          selectEl[0].focus();

          // disable scroll lock
          util.disableScrollLock(true);

          // remove event handlers
          jqLite.off(document, 'click', closeMenuFn);
          jqLite.off(window, 'resize', closeMenuFn);
        }
      });

      /**
       * Scroll to menu items (if hidden)
       */
      scope.$watch('menuIndex', function (newVal, oldVal) {
        // skip initialization
        if (newVal === oldVal) return;

        // scroll menu after rendering is finished
        $timeout(function () {
          var itemEl = selectEl.children()[scope.menuIndex],
              itemRect = itemEl.getBoundingClientRect(),
              menuEl = itemEl.parentNode;

          if (itemRect.top < 0) {
            // menu item is hidden above visible window
            menuEl.scrollTop = menuEl.scrollTop + itemRect.top - 5;
          } else if (itemRect.top > window.innerHeight) {
            // menu item is hidden below visible window
            menuEl.scrollTop = menuEl.scrollTop + (itemRect.top + itemRect.height - window.innerHeight) + 5;
          }
        });
      });

      scope.$watch('ngDisabled', function (newVal) {
        if (newVal === true) wrapperEl.prop('tabIndex', '-1');else if (!scope.useDefault) wrapperEl.prop('tabIndex', '0');
      });
    }
  };
}]);

/** Define module API */
exports.default = moduleName;
module.exports = exports['default'];