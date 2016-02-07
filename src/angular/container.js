module.exports = angular.module('mui.container', [])
  .directive('muiContainer', function() {
    return {
      restrict: 'AE',
      template: '<div class="mui-container"></div>',
      transclude: true,
      scope : true,
      replace: true,
      link: function(scope, element, attr, controller, linker) {
        /**
         * <mui-container ng-controller=""></mui-container>
         * ng-transclude's scope problem , if ng-transclude used , ng-controller will not work.
         */
        linker(scope, function(clone) {
          element.append(clone);
        });

        /**
         * if fluid
         */
        if(!angular.isUndefined(attr.fluid)){
            element.removeClass('mui-container').addClass('mui-container-fluid');
        }
      }
    };
  });
