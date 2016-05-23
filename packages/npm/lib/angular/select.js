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
      ngDisabled: '=',
      ngModel: '='
    },
    replace: true,
    transclude: true,
    template: '<div class="mui-select" ' + 'ng-blur="onWrapperBlur()" ' + 'ng-focus="onWrapperFocus($event)" ' + 'ng-keydown="onWrapperKeydown($event)">' + '<select ' + 'name="{{name}}" ' + 'ng-click="onClick()" ' + 'ng-disabled="ngDisabled" ' + 'ng-focus="onFocus()" ' + 'ng-model="ngModel" ' + 'ng-mousedown="onMousedown($event)" ' + '>' + '<option ng-repeat="option in options" value="{{option.value}}">{{option.label}}</option>' + '</select>' + '<label>{{label}}</label>' + '<div ' + 'class="mui-select__menu"' + 'ng-show="!useDefault && isOpen"> ' + '<div ' + 'ng-click="chooseOption(option)" ' + 'ng-repeat="option in options track by $index" ' + 'ng-class=\'{"mui--is-selected": $index === menuIndex}\'>{{option.label}}</div>' + '</div>' + '</div>',
    link: function link(scope, element, attrs, controller, transcludeFn) {
      var wrapperEl = element,
          menuEl = element.find('div'),
          selectEl = element.find('select'),
          isUndef = _angular2.default.isUndefined,
          cacheIndex;

      // disable MUI js
      selectEl[0]._muiSelect = true;

      // init scope
      scope.options = [];
      scope.isOpen = false;
      scope.useDefault = false;
      scope.origTabIndex = selectEl[0].tabIndex;
      scope.menuIndex = 0;

      // handle `use-default` attribute
      if (!isUndef(attrs.useDefault)) scope.useDefault = true;

      // make wrapper focusable
      wrapperEl.prop('tabIndex', -1);

      // extract <option> elements from children
      transcludeFn(function (clone) {
        var el, k;

        // iterate through children
        for (k in clone) {
          el = clone[k];

          // add option to scope
          if (el.tagName === 'MUI-OPTION') {
            scope.options.push({
              value: el.getAttribute('value'),
              label: el.getAttribute('label')
            });
          }
        }
      });

      /**
       * Handle click event on <select> element.
       */
      scope.onClick = function () {
        // check flag
        if (scope.useDefault === true) return;

        // open menu
        scope.isOpen = true;

        // defer focus
        wrapperEl[0].focus();
      };

      /**
       * Handle focus event on <select> element.
       */
      scope.onFocus = function () {
        // check flag
        if (scope.useDefault === true) return;

        // disable tabfocus once
        var el = selectEl[0];
        scope.origTabIndex = el.tabIndex;
        el.tabIndex = -1;

        // defer focus to parent
        wrapperEl[0].focus();
      };

      /**
       * Handle mousedown event on <select> element
       */
      scope.onMousedown = function ($event) {
        // check flag
        if (scope.useDefault === true) return;

        // cancel default menu
        $event.preventDefault();
      };

      /**
       * Handle blur event on wrapper element.
       */
      scope.onWrapperBlur = function () {
        // replace select element tab index
        selectEl[0].tabIndex = scope.origTabIndex;
      };

      /**
       * Handle focus event on wrapper element.
       * @param {Event} $event - Angular event instance
       */
      scope.onWrapperFocus = function ($event) {
        // firefox bugfix
        if (selectEl[0].disabled) return wrapperEl[0].blur();
      };

      /**
       * Handle keydown event on wrapper element.
       * @param {Event} $event - Angular event instance
       */
      scope.onWrapperKeydown = function ($event) {
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

          if (keyCode === 27) {
            // close
            scope.isOpen = false;
          } else if (keyCode === 40) {
            // increment
            if (scope.menuIndex < scope.options.length - 1) {
              scope.menuIndex += 1;
            }
          } else if (keyCode === 38) {
            // decrement
            if (scope.menuIndex > 0) scope.menuIndex -= 1;
          } else if (keyCode === 13) {
            // choose and close
            scope.ngModel = scope.options[scope.menuIndex].value;
            scope.isOpen = false;
          }
        }
      };

      /**
       * Choose option the user selected.
       * @param {Object} option - The option selected.
       */
      scope.chooseOption = function (option) {
        scope.ngModel = option.value;
        scope.isOpen = false;
      };

      // function to close menu on window resize and document click
      function closeMenuFn() {
        scope.isOpen = false;
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
          var value = scope.ngModel,
              options = scope.options,
              m = options.length,
              i;

          for (i = 0; i < m; i++) {
            if (options[i].value === value) {
              scope.menuIndex = i;
              break;
            }
          }

          // set position of custom menu
          var props = formlib.getMenuPositionalCSS(element[0], scope.options.length, scope.menuIndex);

          menuEl.css(props);
          jqLite.scrollTop(menuEl[0], props.scrollTop);

          // attach event handlers
          $timeout(function () {
            jqLite.on(document, 'click', closeMenuFn);
            jqLite.on(window, 'resize', closeMenuFn);
          });
        } else {
          // focus select element
          selectEl[0].focus();

          // disable scroll lock
          util.disableScrollLock();

          // remove event handlers
          jqLite.off(document, 'click', closeMenuFn);
          jqLite.off(window, 'resize', closeMenuFn);
        }
      });
    }
  };
}]);

/** Define module API */
exports.default = moduleName;
module.exports = exports['default'];