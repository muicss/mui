/**
 * MUI Angular Input and Textarea Components
 * @module angular/input
 */

import angular from 'angular';


const moduleName = 'mui.input',
      emptyClass = 'mui--is-empty',
      notEmptyClass = 'mui--is-not-empty',
      dirtyClass = 'mui--is-dirty';


/**
 * Handle empty/not-empty/dirty classes.
 * @param {Element} elem - The angular-wrapped DOM element.
 */
function handleEmptyClasses(inputEl, value) {
  if (value) inputEl.removeClass(emptyClass).addClass(notEmptyClass);
  else inputEl.removeClass(notEmptyClass).addClass(emptyClass);
}


/**
 * Build directive function.
 * @param {Boolean} isTextArea
 */
function inputFactory(isTextArea) {
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
        var inputEl = element.find('input') || element.find('textarea'),
            labelEl = element.find('label'),
            ngModelCtrl = controllers[0],
            formCtrl = controllers[1],
            isUndef = angular.isUndefined,
            el = inputEl[0];

        // disable MUI js
        if (el) el._muiTextfield = true;

        // remove attributes from wrapper
        element.removeAttr('ng-change');
        element.removeAttr('ng-model');

        // scope defaults
        if (!isTextArea) scope.type = scope.type || 'text';
        else scope.rows = scope.rows || 2;
        
        // autofocus
        if (!isUndef(attrs.autofocus)) inputEl[0].focus();

        // required
        if (!isUndef(attrs.required)) inputEl.prop('required', true);

        // invalid
        if (!isUndef(attrs.invalid)) inputEl.addClass('mui--is-invalid');

        // set is-empty|is-no-empty
        handleEmptyClasses(inputEl, scope.ngModel);

        // float-label
        if (!isUndef(scope.floatLabel)) {
          element.addClass('mui-textfield--float-label');

          $timeout(function() {
            labelEl.css({
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
          handleEmptyClasses(inputEl, val);
          
          // add is-dirty
          inputEl.addClass(dirtyClass);
        }

        // handle focus event
        scope.onFocus = function() {
          inputEl.addClass(dirtyClass);
        }
      }
    };
  }];
}


angular.module(moduleName, [])
  .directive('muiInput', inputFactory(false))
  .directive('muiTextarea', inputFactory(true));


/** Define module API */
export default moduleName;
