var babelHelpers = require('./babel-helpers.js');
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = require('angular');

var _angular2 = babelHelpers.interopRequireDefault(_angular);

var _jqLite = require('../js/lib/jqLite');

var jqLite = babelHelpers.interopRequireWildcard(_jqLite);
/**
 * MUI Angular Button Component
 * @module angular/button
 */

var moduleName = 'mui.button';

_angular2.default.module(moduleName, []).directive('muiButton', function () {
  return {
    restrict: 'AE',
    scope: {
      type: '@?'
    },
    replace: true,
    template: '<button class="mui-btn" type={{type}} mui-ripple ng-transclude></button>',
    transclude: true,
    link: function link(scope, element, attrs) {
      var isUndef = _angular2.default.isUndefined,
          el = element[0];

      // disable MUI js
      el._muiDropdown = true;
      el._muiRipple = true;

      // handle disabled attribute
      if (!isUndef(attrs.disabled) && isUndef(attrs.ngDisabled)) {
        element.prop('disabled', true);
      }

      // set button styles       
      _angular2.default.forEach(['variant', 'color', 'size'], function (attrName) {
        var attrVal = attrs[attrName];
        if (attrVal) element.addClass('mui-btn--' + attrVal);
      });
    }
  };
}).directive('muiRipple', ['$timeout', function ($timeout) {
  return {
    restrict: 'A',
    link: function link(scope, element, attrs) {
      var rippleClass = 'mui-ripple-effect';

      /**
       * onmousedown ripple effect
       * @param  {event} mousedown event
       */
      element.on('mousedown', function (event) {
        if (element.prop('disabled')) return;

        var offset = jqLite.offset(element[0]),
            xPos = event.pageX - offset.left,
            yPos = event.pageY - offset.top,
            diameter,
            radius;

        diameter = offset.height;
        if (element.hasClass('mui-btn--fab')) diameter = offset.height / 2;
        radius = diameter / 2;

        // ripple Dom position
        var rippleStyle = {
          height: diameter + 'px',
          width: diameter + 'px',
          top: yPos - radius + 'px',
          left: xPos - radius + 'px'
        };

        var ripple = _angular2.default.element('<div></div>').addClass(rippleClass);
        for (var style in rippleStyle) {
          ripple.css(style, rippleStyle[style]);
        }

        element.append(ripple);

        // remove after delay
        $timeout(function () {
          ripple.remove();
        }, 2000);
      });
    }
  };
}]);

/** Define module API */
exports.default = moduleName;
module.exports = exports['default'];