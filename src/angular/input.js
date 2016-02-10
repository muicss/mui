var inputFactory = function(isTextArea) {
  var scope = {
    innerInput: '=?ngModel',
    floatingLabel: '@',
    type: '@',
    hint: '@',
    label: '@',
    ngChange: '&'
  };

  isTextArea && (scope.rows = '@');

  /**
   * directive factory
   */
  return ['$compile', '$timeout', function($compile, $timeout) {
    return {
      restrict: 'AE',
      require: ['?ngModel', '^?form'],
      scope: scope,
      replace: true,
      template: '<div class="mui-textfield" ng-class=\'{"mui-textfield--float-label" : floatingLabel}\'>' +
        '<input ng-model="innerInput" ng-change="onChange()" placeholder={{hint}} type={{type}} />' +
        '<label>{{floatingLabel || label}}</label>' +
        '</div>',

      link: function(scope, element, attrs, ctrls) {

        var $input = element.find('input'),
          $label = element.find('label'),
          emptyClass = 'mui--is-empty',
          notEmptyClass = 'mui--is-not-empty',
          dirtyClass = 'mui--is-dirty',
          ngModelCtrl = ctrls[0],
          formCtrl = ctrls[1],
          autofocus = !angular.isUndefined(attrs.autofocus),
          input;

        /**
         * init
         */
        scope.type = scope.type || (isTextArea ? 'textarea' : 'text');
        scope.rows = scope.rows || 2;
        if (scope.type === 'textarea') {
          $input.remove();
          $input = angular.element('<textarea ng-model="innerInput" ng-change="onChange()" ' +
            'placeholder={{hint}} rows={{rows}}></textarea>');
          element.prepend($compile($input)(scope));
        }
        autofocus && $input[0].focus();
        scope.innerInput ? $input.addClass(notEmptyClass) : $input.addClass(emptyClass);
        if (attrs.required) {
          $input.prop('required', true);
        }
        if (scope.floatingLabel) {
          $timeout(function() {
            $label.css({
              'transition': '.15s ease-out',
              '-webkit-transition': '.15s ease-out',
              '-moz-transition': '.15s ease-out',
              '-o-transition': '.15s ease-out',
              '-ms-transition': '.15s ease-out',
            })
          },150);
        }
        $input.on('focus', function() {
          $input.addClass(dirtyClass);
        })
        $input.on('input',function() {
          var inputValue = $input.val();
          if (inputValue) {
            $input.attr('value', inputValue)
            $input.removeClass(emptyClass).addClass(notEmptyClass);
          } else {
            $input.removeAttr('value')
            $input.removeClass(notEmptyClass).addClass(emptyClass);
          }
        });

        if (!ngModelCtrl) {
          throw new Error('ngModel not found inside of muiInput/muiTextarea tag!');
        }

        if (!formCtrl) {
          throw new Error('muiInput/muiTextarea must be placed inside of a form tag!');
        }

        /**
         * 当指令的model发生变化时触发change事件
         */
        ngModelCtrl.$render = function() {
          scope.innerInput !== undefined && scope.ngChange && scope.ngChange();
        }

        /**
         * 表单验证以及样式处理
         */
        scope.$watch('innerInput', function() {
          input = formCtrl[element.attr('name')];
          input.$valid ? $input.removeClass('mui--is-invalid') : $input.addClass('mui--is-invalid');
        });

      }
    };
  }];
}
module.exports = angular.module('mui.input', [])
  .directive('muiInput', inputFactory(false))
  .directive('muiTextarea', inputFactory(true));
