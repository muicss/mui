/**
 * MUI Angular Select Component
 * @module angular/select
 */

import angular from 'angular';

import * as formlib from '../js/lib/forms';
import * as util from '../js/lib/util';
import * as jqLite from '../js/lib/jqLite';


const moduleName = 'mui.option';


angular.module(moduleName, [])
  .directive('muiOption', function() {
    return {
      restrict: 'AE',
      replace: true,
      //require: '^muiSelect',
      scope: {
        label: '@',
        value: '@',
        ngDisabled: '='
      },
      template: '<option>{{label}}</option>',
      link: function(scope, element, attrs, controller) {
        /*
        // register
        controller.addMenuItem({
          label: attrs.label,
          value: attrs.value,
          disabled: scope.ngDisabled,
          hidden: attrs.hidden
        });

        // destroy hook
        scope.$on('$destroy', function() {
          controller.removeMenuItem(attrs.value);
        });
        */
      }
    };
  });


/** Define module API */
export default moduleName;
