/**
 * MUI Angular Tabs Component
 * @module angular/tabs
 */

module.exports = angular.module('mui.tabs', [])
  .directive('muiTabs', function() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {
        justified: '=?',
        selected: '=?'
      },
      controller: function($scope) {
        var panes = $scope.panes = [];

        $scope.selected = $scope.selected || 0;

        $scope.onClick = function(pane, panelIndex) {
          angular.forEach(panes, function(pane) {
            pane.selected = false;
          });
          pane.selected = true;
          $scope.selected = panelIndex;
        };

        $scope.$watch('selected', function(newVal) {
          $scope.onClick(panes[newVal] , newVal);
        });

        this.addPane = function(pane) {
          if (panes.length === $scope.selected) {
            $scope.select(pane, $scope.selected);
          }
          panes.push(pane);
        };
      },
      template: '' +
        '<ul class="mui-tabs__bar" ' +
        'ng-class=\'{"mui-tabs__bar--justified" : justified}\'>' +
        '<li ng-repeat="pane in panes track by $index" ' +
        'ng-class=\'{"mui--is-active" : pane.selected}\'>' +
        '<a ng-click="onClick(pane, $index)">{{pane.title}}</a>' +
        '</li>' +
        '</ul>'+
        '<ng-transclude></ng-transclude>'
    };
  })
  .directive('muiTab', function() {
    return {
      require: '^muiTabs',
      restrict: 'AE',
      scope: {
        title: '@'
      },
      replace: true,
      template: '<div class="mui-tabs__pane" ' +
        'ng-class=\'{"mui--is-active" : selected}\' ng-transclude></div>',
      transclude: true,
      link: function(scope, element, attrs, tabsCtrl) {
        tabsCtrl.addPane(scope);
      }
    };
  });
