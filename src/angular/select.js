/**
 * MUI Angular Select Component
 * @module angular/select
 */


var formlib = require('../js/lib/forms'),
    util = require('../js/lib/util'),
    jqLite = require('../js/lib/jqLite');


module.exports = angular.module('mui.select', [])
  .directive('muiSelect', ['$timeout', function($timeout) {
    return {
      restrict: 'AE',
      require: ['ngModel'],
      scope: {
        name: '@',
        ngDisabled: '=',
        ngModel: '='
      },
      replace: true,
      transclude: true,
      template: '<div class="mui-select" ' +
        'ng-blur="onWrapperBlur()" ' +
        'ng-focus="onWrapperFocus($event)" ' +
        'ng-keydown="onWrapperKeydown($event)">' +
        '<select ' +
        'name="{{name}}" ' +
        'ng-disabled="ngDisabled" ' +
        'ng-focus="onFocus()" ' +
        'ng-keydown="onKeydown($event)" ' +
        'ng-model="ngModel" ' +
        '>' +
        '<option ng-repeat="item in options" value="{{item.value}}">{{item.label}}</option>' +
        '</select>' +
        '<div ' +
        'class="mui-select__menu"' +
        'ng-show="!useDefault && isOpen"> ' +
        '<div ' +
        'ng-click="select($index)" ' +
        'ng-repeat="option in options track by $index" ' +
        'ng-class=\'{"mui--is-selected" : option.value == innerInput}\'>{{option.label}}</div>' +
        '</div>' +
        '</div>',
      link: function(scope, element, attrs, controller, transcludeFn) {
        var wrapperEl = element,
            menuEl = element.find('div'),
            selectEl = element.find('select'),
            isUndef = angular.isUndefined,
            cacheIndex;

        // init scope
        scope.options = [];
        scope.isOpen = false;
        scope.useDefault = false;
        scope.currentIndex = 0;

        // handle `use-default` attribute
        if (!isUndef(attrs.useDefault)) scope.useDefault = true;

        // make wrapper focusable
        wrapperEl.prop('tabIndex', -1);

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
         * Handle focus event on <select> element.
         */
        scope.onFocus = function() {
          // check flag
          if (scope.useDefault === true) return;

          // defer focus to parent
          wrapperEl[0].focus();
        };


        /**
         * Handle keydown event on <select> element.
         * @param {Event} $event - Angular event instance
         */
        scope.onKeydown = function($event) {
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
            console.log(keyCode);
          }
        };


        /**
         *
         */

        /**
         * Handle focus event on wrapper element.
         * @param {Event} $event - Angular event instance
         */
        scope.onWrapperFocus = function($event) {
          // firefox bugfix
          if (selectEl[0].disabled) return wrapperEl[0].blur();
        };


        /**
         * Handle keydown event on wrapper element.
         * @param {Event} $event - Angular event instance
         */
        scope.onWrapperKeydown = function($event) {
          console.log('onWrapperKeydown');
        };


        /**
         * Open/Close custom select menu
         */
        scope.$watch('isOpen', function(isOpen) {
          // exit if use-default is true
          if (scope.useDefault === true) return;

          if (isOpen === true) {
            // set position of custom menu
            var props = formlib.getMenuPositionalCSS(
              element[0],
              scope.options.length,
              scope.currentIndex
            );

            menuEl.css(props);
          } else {
            
          }
        });
        /*
        // state vars
        scope.currentIndex = 0;        
        scope._menuIsShow = false;

        // 显示菜单
        function showMenuFn(e) {
          if (e) e.preventDefault();

          cacheIndex = scope.currentIndex;
          selectEl[0].focus();

          util.enableScrollLock();

          var css = formlib.getMenuPositionalCSS(
            element[0],
            options.length,
            scope.currentIndex
          );

          menuEl
            .css('height', css.height)
            .css('top', css.top);

          scope.$apply(function() {
            scope._menuIsShow = true;
          });
        };

        //隐藏菜单
        function hideMenuFn(e) {
          scope.$apply(function() {
            scope._menuIsShow = false;
            util.disableScrollLock();
          });
        }

        function increment() {
          if(!scope._menuIsShow){
            showMenuFn();
          } else if (scope.currentIndex < options.length - 1) {
            scope.$apply(function() {
              scope.currentIndex += 1;
            });
          }
        };

        function decrement() {
          if (!scope._menuIsShow) {
            showMenuFn();
          } else if (scope.currentIndex > 0){
            scope.$apply(function() {
              scope.currentIndex--;
            });
          }
        };

        function revertAndHideMenu() {
          if(scope._menuIsShow){
            scope.select(cacheIndex);
            hideMenuFn();
          }
        }

        function onKeydown(ev) {
          var keyCode = ev.keyCode;

          // escape | up | down | enter
          if (keyCode === 27 
              || keyCode === 40 
              || keyCode === 38 
              || keyCode === 13) {
            ev.preventDefault();
          }

          if (keyCode === 27 || keyCode === 9) revertAndHideMenu();
          else if (keyCode === 40) increment();
          else if (keyCode === 38) decrement();
          else if (keyCode === 13) hideMenuFn();
        }

        scope.$watch('currentIndex', function(newIndex) {
          if (newIndex === undefined) return;
          scope.innerInput = options[newIndex].value;
        });

        scope.select = function(index) {
          scope.innerInput = options[index].value;
          scope.currentIndex = index;
          scope._menuIsShow = false;
          util.disableScrollLock();
        }

        selectEl.on('mousedown', showMenuFn);
        element.on('keydown', onKeydown);// add event listeners
        jqLite.on(window, 'resize', revertAndHideMenu);
        jqLite.on(document, 'click', revertAndHideMenu);

        scope.$on('$destroy', function() {
          selectEl.off('mousedown', showMenuFn);
          element.off('keydown', onKeydown);
          jqLite.off(window, 'resize', revertAndHideMenu);
          jqLite.off(document, 'click', revertAndHideMenu);
        });
        */

      }
    }
  }]);
