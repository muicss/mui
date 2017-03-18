/**
 * MUI Angular Select Component
 * @module angular/select
 */

import angular from 'angular';

import * as formlib from '../js/lib/forms';
import * as util from '../js/lib/util';
import * as jqLite from '../js/lib/jqLite';


const moduleName = 'mui.select';


angular.module(moduleName, [])
  .directive('muiSelect', ['$timeout', function($timeout) {
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
      template: '<div class="mui-select" ' +
        'ng-blur="onWrapperBlurOrFocus($event)" ' +
        'ng-click="onWrapperClick($event)" ' +
        'ng-focus="onWrapperBlurOrFocus($event)" ' +
        'ng-keydown="onWrapperKeydown($event)" ' +
        'ng-keypress="onWrapperKeypress($event)">' +
        '<select ' +
        'name="{{name}}" ' +
        'ng-disabled="ngDisabled" ' +
        'ng-model="ngModel" ' +
        'ng-mousedown="onInnerMousedown($event)" ' +
        '>' +
        '<option ng-repeat="option in options" value="{{option.value}}">{{option.label}}</option>' +
        '</select>' +
        '<label>{{label}}</label>' +
        '<div ' +
        'class="mui-select__menu"' +
        'ng-show="!useDefault && isOpen"> ' +
        '<div ' +
        'ng-click="chooseOption($event, option)" ' +
        'ng-repeat="option in options track by $index" ' +
        'ng-class=\'{"mui--is-selected": $index === menuIndex}\'>{{option.label}}</div>' +
        '</div>' +
        '</div>',
      link: function(scope, element, attrs, controller, transcludeFn) {
        var wrapperEl = element,
            menuEl = element.find('div'),
            selectEl = element.find('select'),
            isUndef = angular.isUndefined,
            cacheIndex;

        // disable MUI js
        selectEl[0]._muiSelect = true;

        // init scope
        scope.options = [];
        scope.isOpen = false;
        scope.useDefault = ('ontouchstart' in document.documentElement) 
          ? true : false;
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

        // extract <option> elements from children
        transcludeFn(function(clone) {
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
         * Handle blur and focus events on wrapper <div> element.
         * @param {Event} $event - Angular event instance
         */
        scope.onWrapperBlurOrFocus = function($event) {
          // ignore events that bubbled up
          if (document.activeElement !== wrapperEl[0]) return;

          util.dispatchEvent(selectEl[0], $event.type, false, false);
        };


        /**
         * Handle click event on wrapper <div> element.
         * @param {Event} $event - Angular event instance
         */
        scope.onWrapperClick = function($event) {
          // only left click, check default prevented and useDefault
          if ($event.button !== 0 ||
              $event.defaultPrevented ||
              scope.useDefault ||
              selectEl[0].disabled) {
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
        scope.onWrapperKeydown = function($event) {
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
            if (keyCode === 27 
                || keyCode === 40
                || keyCode === 38
                || keyCode === 13) {
              $event.preventDefault();
            }

            if (keyCode === 27) {
              // escape -> close
              scope.isOpen = false;
            } else if (keyCode === 40) {
              // up -> increment
              if (scope.menuIndex < scope.options.length - 1) {
                scope.menuIndex += 1;
              }
            } else if (keyCode === 38) {
              // down -> decrement
              if (scope.menuIndex > 0) scope.menuIndex -= 1;
            } else if (keyCode === 13) {
              // enter -> choose and close
              scope.ngModel = scope.options[scope.menuIndex].value;  
              scope.isOpen = false;
            }

          }
        };


        /**
         * Handle keypress event on wrapper element.
         * @param {Event} $event - Angular event instance
         */
        scope.onWrapperKeypress = function($event) {
          // exit if preventDefault() was called or useDefault is true or
          // menu is closed
          if ($event.defaultPrevented || scope.useDefault || !scope.isOpen) {
            return;
          }

          // handle query timer
          clearTimeout(scope.qTimeout);
          scope.q += $event.key;
          scope.qTimeout = setTimeout(function() {scope.q = '';}, 300);

          // select first match alphabetically
          var prefixRegex = new RegExp('^' + scope.q, 'i'),
              options = scope.options,
              m = options.length,
              i;

          for (i=0; i < m; i++) {
            if (prefixRegex.test(options[i].label)) {
              scope.menuIndex = i;
              break;
            }
          }
        }


        /**
         * Handle mousedown event on Inner <select> element
         * @param {Event} $event - Angular event instance
         */
        scope.onInnerMousedown = function($event) {
          // check flag
          if ($event.button !== 0 || scope.useDefault === true) return;

          // prevent built-in menu from opening
          $event.preventDefault();
        };


        /**
         * Choose option the user selected.
         * @param {Object} option - The option selected.
         */
        scope.chooseOption = function($event, option) {
          // prevent bubbling
          $event.stopImmediatePropagation();

          scope.ngModel = option.value;
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
        scope.$watch('isOpen', function(isOpen, oldVal) {
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

            for (i=0; i < m; i++) {
              if (options[i].value === value) {
                scope.menuIndex = i;
                break;
              }
            }

            // set position of custom menu
            var props = formlib.getMenuPositionalCSS(
              element[0],
              scope.options.length,
              scope.menuIndex
            );

            menuEl.css(props);
            jqLite.scrollTop(menuEl[0], props.scrollTop);

            // attach event handlers
            $timeout(function() {
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

        scope.$watch('ngDisabled', function(newVal) {
          if (newVal === true) wrapperEl.prop('tabIndex', '-1');
          else if (!scope.useDefault) wrapperEl.prop('tabIndex', '0');
        });
      }
    }
  }]);


/** Define module API */
export default moduleName;
