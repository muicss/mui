var formlib = require('../js/lib/forms');
var util = require('../js/lib/util');
var jqLite = require('../js/lib/jqLite');
module.exports = angular.module('mui.select', [])
  .directive('muiSelect', function() {
    return {
      restrict: 'AE',
      require: ['?ngModel'],
      scope: {
        disable : '=',
        innerInput: '=?ngModel'
      },
      replace: true,
      transclude: true,
      template: '<div class="mui-select">' +
        '<select ng-model="innerInput" ng-disabled="disable" ng-transclude>' +
        '</select>' +
        '<div ng-show="_menuIsShow" class="mui-select__menu">' +
          '<div ng-click="select($index)" ng-repeat="option in options track by $index" ng-class=\'{"mui--is-selected" : option.value == innerInput}\'>{{option.label}}</div>' +
        '</div>' +
        '</div>',
      link: function(scope, element, attrs, controller) {
        var options = scope.options,
          showMenuFn, hideMenuFn,onKeydown,
          increment , decrement ,revertAndHideMenu,
          getMenuPosition, css,cacheIndex,
          $menu = angular.element(element[0].querySelector('.mui-select__menu')),
          $select = element.find('select');

        scope._menuIsShow = false;

        /**
         * 获取菜单位置
         * @return {Object} 菜单位置 height,top,scrollTop
         */
        getMenuPosition = function() {
          return formlib.getMenuPositionalCSS(
            element[0],
            options.length,
            scope._currentIndex || 0
          );
        };

        // 显示菜单
        showMenuFn = function(e) {
          e && e.preventDefault();
          cacheIndex = scope._currentIndex;
          element.find('select')[0].focus();
          util.enableScrollLock();
          css = getMenuPosition();
          $menu.css('height', css.height)
            .css('top', css.top);
          scope.$apply(function() {
            scope._menuIsShow = true;
          });
        };

        //隐藏菜单
        hideMenuFn = function(e) {
          scope.$apply(function() {
            scope._menuIsShow = false;
            util.disableScrollLock();
          });
        }

        increment = function() {
          if(!scope._menuIsShow){
            showMenuFn();
          }
          else if(scope._currentIndex < options.length-1){
            scope.$apply(function() {
              scope._currentIndex++;
            });
          }
        };

        decrement = function() {
          if(!scope._menuIsShow){
            showMenuFn();
          }
          else if(scope._currentIndex > 0){
            scope.$apply(function() {
              scope._currentIndex--;
            });
          }
        };

        revertAndHideMenu = function() {
          if(scope._menuIsShow){
              scope.select(cacheIndex);
              hideMenuFn();
          }
        }

        onKeydown = function(ev) {
          var keyCode = ev.keyCode;
          // escape | up | down | enter
          if (keyCode === 27 || keyCode === 40 || keyCode === 38 || keyCode === 13) {
            ev.preventDefault();
          }

          if (keyCode === 27 || keyCode === 9) {
            revertAndHideMenu();
          } else if (keyCode === 40) {
            increment();
          } else if (keyCode === 38) {
            decrement();
          } else if (keyCode === 13) {
            hideMenuFn();
          }
        }

        scope.$watch('_currentIndex',function(newIndex) {
          if(newIndex === undefined) return;
          scope.innerInput = options[newIndex].value;
        });

        scope.select = function(index) {
          scope.innerInput = options[index].value;
          scope._currentIndex = index;
          scope._menuIsShow = false;
          util.disableScrollLock();
        }

        $select.on('mousedown', showMenuFn);
        element.on('keydown', onKeydown);// add event listeners
        jqLite.on(window, 'resize', revertAndHideMenu);
        jqLite.on(document, 'click', revertAndHideMenu);

        scope.$on('$destroy',function() {
          $select.off('mousedown', showMenuFn);
          element.off('keydown', onKeydown);
          jqLite.off(window, 'resize', revertAndHideMenu);
          jqLite.off(document, 'click', revertAndHideMenu);
        });

      },
      controller: function($scope) {
        var options = $scope.options = [];
        this.addOption = function(option) {
          if(!$scope.innerInput && options.length === 0){
            $scope._currentIndex = 0;
            $scope.innerInput = option.value;
          }
          if (option.value == $scope.innerInput) {
            $scope._currentIndex = options.length;
          }
          options.push(option);
        }
      }
    }
  })
  .directive('muiOption', function() {
    return {
      require: '^muiSelect',
      restrict: 'AE',
      scope: {
        value: '@',
        label: '@'
      },
      replace: true,
      template: '<option value={{value}} >{{label}}</option>',
      link: function(scope, element, attrs, selectCtrl) {
        selectCtrl.addOption(scope);
      }
    }
  });
