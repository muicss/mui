var babelHelpers = require('./babel-helpers.js');
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = require('angular');

var _angular2 = babelHelpers.interopRequireDefault(_angular);

var moduleName = 'mui.input';

/**
 * Build directive function.
 * @param {Boolean} isTextArea
 */
/**
 * MUI Angular Input and Textarea Components
 * @module angular/input
 */

function inputFactory(isTextArea) {
  var scopeArgs, template, ngClassStr, attrs;

  // defaults
  scopeArgs = {
    floatLabel: '@',
    hint: '@',
    label: '@',
    name: '@',
    ngDisabled: '=',
    ngMaxlength: '@',
    ngMinlength: '@',
    ngModel: '='
  };

  template = '<div class="mui-textfield">';

  ngClassStr = '{' + ["'mui--is-touched': inputCtrl.$touched", // hasn't lost focus yet
  "'mui--is-untouched': inputCtrl.$untouched", "'mui--is-pristine': inputCtrl.$pristine", // user hasn't interacted yet
  "'mui--is-dirty': inputCtrl.$dirty", "'mui--is-empty': inputCtrl.$isEmpty(inputCtrl.$viewValue)", "'mui--is-not-empty': !inputCtrl.$isEmpty(inputCtrl.$viewValue)", "'mui--is-invalid': inputCtrl.$invalid"].join(',') + '}';

  attrs = ['name={{name}}', 'placeholder={{hint}}', 'ng-class="' + ngClassStr + '"', 'ng-disabled="ngDisabled"', 'ng-maxlength={{ngMaxlength}}', 'ng-minlength={{ngMinlength}}', 'ng-model="ngModel"'];

  // element-specific
  if (!isTextArea) {
    scopeArgs.type = '@';
    attrs.push('type={{type}}');
    template += '<input ' + attrs.join(' ') + '>';
  } else {
    scopeArgs.rows = '@';
    attrs.push('rows={{rows}}');
    template += '<textarea ' + attrs.join(' ') + '></textarea>';
  }

  // update template
  template += '<label tabindex="-1">{{label}}</label></div>';

  // directive function
  return ['$timeout', function ($timeout) {
    return {
      restrict: 'AE',
      require: ['ngModel'],
      scope: scopeArgs,
      replace: true,
      template: template,
      link: function link(scope, element, attrs, controllers) {
        var inputEl = element.find(isTextArea ? 'textarea' : 'input'),
            labelEl = element.find('label'),
            ngModelCtrl = controllers[0],
            formCtrl = controllers[1],
            isUndef = _angular2.default.isUndefined,
            el = inputEl[0];

        // add inputCrl to scope
        scope.inputCtrl = inputEl.controller('ngModel');

        // disable MUI js
        if (el) el._muiTextfield = true;

        // remove attributes from wrapper
        element.removeAttr('ng-change');
        element.removeAttr('ng-model');
        element.removeAttr('ng-minlength');
        element.removeAttr('ng-maxlength');

        // scope defaults
        if (!isTextArea) scope.type = scope.type || 'text';else scope.rows = scope.rows || 2;

        // autofocus
        if (!isUndef(attrs.autofocus)) inputEl[0].focus();

        // required
        if (!isUndef(attrs.required)) inputEl.prop('required', true);

        // invalid
        if (!isUndef(attrs.invalid)) inputEl.addClass('mui--is-invalid');

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

        // handle changes
        scope.onChange = function () {
          // trigger ng-change on parent
          if (ngModelCtrl) ngModelCtrl.$setViewValue(scope.ngModel);
        };
      }
    };
  }];
}

_angular2.default.module(moduleName, []).directive('muiInput', inputFactory(false)).directive('muiTextarea', inputFactory(true));

/** Define module API */
exports.default = moduleName;
module.exports = exports['default'];