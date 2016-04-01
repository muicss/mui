/**
 * MUI Angular Input and Textarea Components
 * @module angular/input
 */

var inputFactory = function(isTextArea) {
  var emptyClass = 'mui--is-empty',
      notEmptyClass = 'mui--is-not-empty',
      dirtyClass = 'mui--is-dirty',
      scopeArgs,
      template;

  // defaults
  scopeArgs = {
    floatLabel: '@',
    hint: '@',
    label: '@',
    ngDisabled: '=',
    ngModel: '='
  };

  template = '<div class="mui-textfield">';

  // element-specific
  if (!isTextArea) {
    scopeArgs.type = '@';

    template += '<input ' + 
      'placeholder={{hint}} ' +
      'type={{type}} ' +
      'ng-change="onChange()" ' +
      'ng-disabled="ngDisabled" ' +
      'ng-focus="onFocus()" ' +
      'ng-model="ngModel" ' +
      '>';
  } else {
    scopeArgs.rows = '@';

    template += '<textarea ' +
      'placeholder={{hint}} ' +
      'rows={{rows}} ' +
      'ng-change="onChange()" ' +
      'ng-disabled="ngDisabled" ' +
      'ng-focus="onFocus()" ' +
      'ng-model="ngModel" ' +
      '></textarea>';
  }

  // update template
  template += '<label>{{label}}</label></div>';

  // directive function
  return ['$timeout', function($timeout) {
    return {
      restrict: 'AE',
      require: ['ngModel'],
      scope: scopeArgs,
      replace: true,
      template: template,
      link: function(scope, element, attrs, controllers) {
        var $input = element.find('input') || element.find('textarea'),
            $label = element.find('label'),
            ngModelCtrl = controllers[0],
            formCtrl = controllers[1],
            isUndef = angular.isUndefined;

        // remove attributes from wrapper
        element.removeAttr('ng-change');
        element.removeAttr('ng-model');

        // scope defaults
        if (!isTextArea) scope.type = scope.type || 'text';
        else scope.rows = scope.rows || 2;
        
        // autofocus
        if (!isUndef(attrs.autofocus)) $input[0].focus();

        // required
        if (!isUndef(attrs.required)) $input.prop('required', true);

        // invalid
        if (!isUndef(attrs.invalid)) $input.addClass('mui--is-invalid');

        // set is-empty|is-no-empty
        if (scope.ngModel) {
          $input.removeClass(emptyClass).addClass(notEmptyClass);
        } else {
          $input.removeClass(notEmptyClass).addClass(emptyClass);
        }

        // float-label
        if (!isUndef(scope.floatLabel)) {
          element.addClass('mui-textfield--float-label');

          $timeout(function() {
            $label.css({
              'transition': '.15s ease-out',
              '-webkit-transition': '.15s ease-out',
              '-moz-transition': '.15s ease-out',
              '-o-transition': '.15s ease-out',
              '-ms-transition': '.15s ease-out',
            })
          }, 150);
        }
        
        // handle changes
        scope.onChange = function() {
          var val = scope.ngModel;

          // trigger ng-change
          if (ngModelCtrl) ngModelCtrl.$setViewValue(val);
          
          // set is-empty|is-no-empty
          if (val) $input.removeClass(emptyClass).addClass(notEmptyClass);
          else $input.removeClass(notEmptyClass).addClass(emptyClass);
        }

        // handle focus event
        $input.onFocus = function() {
          $input.addClass(dirtyClass);
        }
      }
    };
  }];
}

module.exports = angular.module('mui.input', [])
  .directive('muiInput', inputFactory(false))
  .directive('muiTextarea', inputFactory(true));
