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
    ngChange: '@',
    ngModel: '='
  };

  template = '<div class="mui-textfield">';

  // element-specific
  if (!isTextArea) {
    scopeArgs.type = '@';

    template += '<input ' + 
      'ng-model="ngModel" ' +
      'ng-change="{{ngChange}}" ' +
      'placeholder={{hint}} ' +
      'type={{type}} ' +
      '>';
  } else {
    scopeArgs.rows = '@';

    template += '<textarea ' +
      'ng-model="ngModel" ' +
      'ng-change="{{ngChange}}" ' +
      'placeholder={{hint}} ' +
      'rows={{rows}} ' +
      '></textarea>';
  }

  // update template
  template += '<label>{{label}}</label></div>';

  /**
   * directive factory
   */
  return ['$compile', '$timeout', function($compile, $timeout) {
    return {
      restrict: 'AE',
      require: ['?ngModel', '^?form'],
      scope: scopeArgs,
      replace: true,
      template: template,
      link: function(scope, element, attrs, ctrls) {
        var $input = element.find('input') || element.find('textarea'),
            $label = element.find('label');

        console.log(scope);

        // remove attributes from wrapper
        element.removeAttr('ng-change');
        element.removeAttr('ng-model');

        // scope defaults
        if (!isTextArea) scope.type = scope.type || 'text';
        else scope.rows = scope.rows || 2;
        
        // autofocus
        if (!angular.isUndefined(attrs.autofocus)) {
          $input[0].focus();
        }

        // required
        if (!angular.isUndefined(attrs.required)) {
          $input.prop('required', true);
        }
          
        // defalutValue
        if (attrs.defaultValue) {
          $input.attr('value', attrs.defaultValue);
          $input.addClass(notEmptyClass);
        } else {
          $input.addClass(emptyClass);
        }

        // float-label
        if (!angular.isUndefined(scope.floatLabel)) {
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

        // event handlers
        $input.on('focus', function() {
          $input.addClass(dirtyClass);
        })

        $input.on('input', function() {
          var value = $input.val();

          if (value) $input.removeClass(emptyClass).addClass(notEmptyClass);
          else $input.removeClass(notEmptyClass).addClass(emptyClass);
        });
      }
    };
  }];
}

module.exports = angular.module('mui.input', [])
  .directive('muiInput', inputFactory(false))
  .directive('muiTextarea', inputFactory(true));
