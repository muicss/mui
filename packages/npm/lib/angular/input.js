var babelHelpers = require('./babel-helpers.js');
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = require('angular');

var _angular2 = babelHelpers.interopRequireDefault(_angular);

var moduleName = 'mui.input',
    touchedClass = 'mui--is-touched',
    // hasn't lost focus yet
untouchedClass = 'mui--is-untouched',
    pristineClass = 'mui--is-pristine',
    // user hasn't interacted yet
dirtyClass = 'mui--is-dirty',
    emptyClass = 'mui--is-empty',
    // control is empty
notEmptyClass = 'mui--is-not-empty';

/**
 * Handle empty/not-emptyclasses.
 * @param {Element} elem - The angular-wrapped DOM element.
 */
/**
 * MUI Angular Input and Textarea Components
 * @module angular/input
 */

function handleEmptyClasses(inputEl, value) {
  if (value) inputEl.removeClass(emptyClass).addClass(notEmptyClass);else inputEl.removeClass(notEmptyClass).addClass(emptyClass);
}

/**
 * Build directive function.
 * @param {Boolean} isTextArea
 */
function inputFactory(isTextArea) {
  var scopeArgs, template;

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

    template += '<input ' + 'placeholder={{hint}} ' + 'type={{type}} ' + 'ng-change="onChange()" ' + 'ng-disabled="ngDisabled" ' + 'ng-focus="onFocus()" ' + 'ng-model="ngModel" ' + '>';
  } else {
    scopeArgs.rows = '@';

    template += '<textarea ' + 'placeholder={{hint}} ' + 'rows={{rows}} ' + 'ng-change="onChange()" ' + 'ng-disabled="ngDisabled" ' + 'ng-focus="onFocus()" ' + 'ng-model="ngModel" ' + '></textarea>';
  }

  // update template
  template += '<label>{{label}}</label></div>';

  // directive function
  return ['$timeout', function ($timeout) {
    return {
      restrict: 'AE',
      require: ['ngModel'],
      scope: scopeArgs,
      replace: true,
      template: template,
      link: function link(scope, element, attrs, controllers) {
        var inputEl = element.find('input') || element.find('textarea'),
            labelEl = element.find('label'),
            ngModelCtrl = controllers[0],
            formCtrl = controllers[1],
            isUndef = _angular2.default.isUndefined,
            el = inputEl[0];

        // disable MUI js
        if (el) el._muiTextfield = true;

        // remove attributes from wrapper
        element.removeAttr('ng-change');
        element.removeAttr('ng-model');

        // scope defaults
        if (!isTextArea) scope.type = scope.type || 'text';else scope.rows = scope.rows || 2;

        // autofocus
        if (!isUndef(attrs.autofocus)) inputEl[0].focus();

        // required
        if (!isUndef(attrs.required)) inputEl.prop('required', true);

        // invalid
        if (!isUndef(attrs.invalid)) inputEl.addClass('mui--is-invalid');

        // set is-empty|is-not-empty
        handleEmptyClasses(inputEl, scope.ngModel);

        // float-label
        if (!isUndef(scope.floatLabel)) {
          element.addClass('mui-textfield--float-label');

          $timeout(function () {
            labelEl.css({
              'transition': '.15s ease-out',
              '-webkit-transition': '.15s ease-out',
              '-moz-transition': '.15s ease-out',
              '-o-transition': '.15s ease-out',
              '-ms-transition': '.15s ease-out'
            });
          }, 150);
        }

        // seed with `untouched`, `pristine` classes
        inputEl.addClass(untouchedClass + ' ' + pristineClass);

        // replace `untouched` with `touched` when control loses focus
        inputEl.on('blur', function blurHandler() {
          // ignore if event is a window blur
          if (document.activeElement === inputEl[0]) return;

          // replace class and remove event handler
          inputEl.removeClass(untouchedClass).addClass(touchedClass);
          inputEl.off('blur', blurHandler);
        });

        // replace `pristine` with `dirty` when user interacts with control
        inputEl.one('input change', function () {
          inputEl.removeClass(pristineClass).addClass(dirtyClass);
        });

        // handle changes
        scope.onChange = function () {
          var val = scope.ngModel;

          // trigger ng-change
          if (ngModelCtrl) ngModelCtrl.$setViewValue(val);

          // set is-empty|is-no-empty
          handleEmptyClasses(inputEl, val);
        };
      }
    };
  }];
}

_angular2.default.module(moduleName, []).directive('muiInput', inputFactory(false)).directive('muiTextarea', inputFactory(true));

/** Define module API */
exports.default = moduleName;
module.exports = exports['default'];