var babelHelpers = require('./babel-helpers.js');
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _angular = babelHelpers.interopRequireDefault(require("angular"));

var jqLite = babelHelpers.interopRequireWildcard(require("../js/lib/jqLite"));
var util = babelHelpers.interopRequireWildcard(require("../js/lib/util"));

/**
 * MUI Angular Button Component
 * @module angular/button
 */
var moduleName = 'mui.button',
    supportsTouch = 'ontouchstart' in document.documentElement,
    mouseDownEvents = supportsTouch ? 'touchstart' : 'mousedown',
    mouseUpEvents = supportsTouch ? 'touchend' : 'mouseup mouseleave';

_angular.default.module(moduleName, []).directive('muiButton', function () {
  return {
    restrict: 'AE',
    replace: true,
    template: '<button class="mui-btn" mui-ripple>' + '<ng-transclude></ng-transclude>' + '<span class="mui-btn__ripple-container">' + '<span class="mui-ripple"></span>' + '</span>' + '</button>',
    transclude: true,
    link: function link(scope, element, attrs) {
      var isUndef = _angular.default.isUndefined,
          el = element[0]; // disable MUI js

      el._muiDropdown = true;
      el._muiRipple = true; // handle disabled attribute

      if (!isUndef(attrs.disabled) && isUndef(attrs.ngDisabled)) {
        element.prop('disabled', true);
      } // set button styles        


      _angular.default.forEach(['variant', 'color', 'size'], function (attrName) {
        var attrVal = attrs[attrName];
        if (attrVal) element.addClass('mui-btn--' + attrVal);
      });
    }
  };
}).directive('muiRipple', ['$timeout', function ($timeout) {
  return {
    restrict: 'A',
    link: function link(scope, element, attrs) {
      var buttonEl = element[0]; // cache reference to ripple element

      buttonEl._rippleEl = buttonEl.querySelector('.mui-ripple'); // add mousedown and mouseup event ripple effect handlers

      element.on(mouseDownEvents, mouseDownHandler);
    }
  };
}]);
/**
 * MouseDown event handler.
 * @param {Event} ev - The DOM event
 */


function mouseDownHandler(ev) {
  var buttonEl = this,
      rippleEl = buttonEl._rippleEl; // exit if disabled

  if (buttonEl.disabled) return; // add mouseup handler on first-click

  if (!rippleEl._init) {
    jqLite.on(buttonEl, mouseUpEvents, mouseUpHandler);
    rippleEl._init = true;
  } // get (x, y) position of click


  var offset = jqLite.offset(buttonEl),
      clickEv = ev.type === 'touchstart' ? ev.touches[0] : ev,
      radius,
      diameter; // calculate radius

  radius = Math.sqrt(offset.width * offset.width + offset.height * offset.height);
  diameter = radius * 2 + 'px'; // set position and dimensions

  jqLite.css(rippleEl, {
    width: diameter,
    height: diameter,
    top: Math.round(clickEv.pageY - offset.top - radius) + 'px',
    left: Math.round(clickEv.pageX - offset.left - radius) + 'px'
  });
  jqLite.removeClass(rippleEl, 'mui--is-animating');
  jqLite.addClass(rippleEl, 'mui--is-visible'); // start animation

  util.requestAnimationFrame(function () {
    jqLite.addClass(rippleEl, 'mui--is-animating');
  });
}
/**
 * MouseUp event handler.
 * @param {Event} ev - The DOM event
 */


function mouseUpHandler(ev) {
  // get ripple element
  var rippleEl = this._rippleEl; // allow a repaint to occur before removing class so animation shows for
  // tap events

  util.requestAnimationFrame(function () {
    jqLite.removeClass(rippleEl, 'mui--is-visible');
  });
}
/** Define module API */


var _default = moduleName;
exports.default = _default;
module.exports = exports.default;