angular.module('mui.container', [])
  .directive('muiContainer', function() {
    return {
      restrict: 'AE',
      template: '<div class="mui-container transclude"></div>',
      transclude: true,
      scope : true,
      link: function(scope, element, attr, controller, linker) {
        var $container = angular.element(element[0].querySelector(".transclude"));
        /**
         * <mui-container ng-controller=""></mui-container>
         * ng-transclude's scope problem , if ng-transclude used , ng-controller will not work.
         */
        linker(scope, function(clone) {
          $container.append(clone);
        });

        /**
         * if fluid
         */
        if(!angular.isUndefined(attr.fluid)){
            $container.removeClass("mui-container").addClass("mui-container-fluid");
        }
      }
    };
  });
