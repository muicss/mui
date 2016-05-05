/**
 * MUI Angular Tabs Component
 * @module angular/tabs
 */

import angular from 'angular';

import * as jqLite from '../js/lib/jqLite';


const moduleName = 'mui.tabs';


angular.module(moduleName, [])
  .directive('muiTabs', function() {
    return {
      restrict: 'EA',
      transclude: true,
      scope: {
        selectedId: '=?selected',
        onChange: '&?'
      },
      template: '' +
        '<ul ' +
        'class="mui-tabs__bar" ' +
        'ng-class=\'{"mui-tabs__bar--justified": justified}\'>' +
        '<li ' +
        'ng-repeat="tab in tabs track by $index" ' +
        'ng-class=\'{"mui--is-active": $index === selectedId}\'>' +
        '<a ng-click="onClick($index)">{{tab.label}}</a>' +
        '</li>' +
        '</ul>',
      controller: ['$scope', function($scope) {
        var counter = 0;

        // init scope
        $scope.tabs = [];

        // add tab
        this.addTab = function(args) {
          // user counter for tab id
          var tabId = counter;
          counter += 1;

          // update tabs list
          $scope.tabs.push({label: args.label});

          // handle active tabs
          if (args.isActive) $scope.selectedId = tabId;

          // return id
          return tabId;
        };
      }],
      link: function(scope, element, attrs, ctrl, transcludeFn) {
        var isUndef = angular.isUndefined;

        // init scope
        if (isUndef(scope.selectedId)) scope.selectedId = 0;
        scope.justified = false;

        // justified
        if (!isUndef(attrs.justified)) scope.justified = true;

        // click handler
        scope.onClick = function(tabId) {
          // check current tab
          if (tabId === scope.selectedId) return;

          // update active tab
          scope.selectedId = tabId;

          // execute onChange callback
          if (scope.onChange) scope.$$postDigest(scope.onChange);
        };

        // use transcludeFn to pass ng-controller on parent element
        transcludeFn(scope, function(clone) {
          element.append(clone);
        });
      }
    };
  })
  .directive('muiTab', ['$parse', function($parse) {
    return {
      require: '^?muiTabs',
      restrict: 'AE',
      scope: {
        active: '&?',
        label: '@?'
      },
      transclude: true,
      template: '<div ' +
        'class="mui-tabs__pane" ' +
        'ng-class=\'{"mui--is-active": tabId === $parent.selectedId}\'></div>',
      link: function(scope, element, attrs, ctrl, transcludeFn) {
        var onSelectFn = $parse(attrs.onSelect),
            onDeselectFn = $parse(attrs.onDeselect),
            origScope = scope.$parent.$parent;

        // init scope
        scope.tabId = null;

        // add to parent controller
        if (ctrl) {
          scope.tabId = ctrl.addTab({
            label: scope.label,
            isActive: Boolean(scope.active)
          });
        }

        // use transcludeFn to pass ng-controller on parent element
        transcludeFn(scope, function(clone) {
          element.find('div').append(clone);
        });

        scope.$parent.$watch('selectedId', function(newVal, oldVal) {
          // ignore initial load
          if (newVal === oldVal) return;

          // execute onSelect
          if (newVal === scope.tabId) onSelectFn(origScope);

          // execute onDeselect
          if (oldVal === scope.tabId) onDeselectFn(origScope);
        });
      }
    };
  }]);


/** Define module API */
export default moduleName;
