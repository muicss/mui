/**
 * MUI Angular Button Component
 * @module angular/button
 */

import angular from 'angular';

import * as jqLite from '../js/lib/jqLite';
import * as util from '../js/lib/util';


const moduleName = 'mui.button',
      rippleClass = 'mui-ripple-effect',
      supportsTouch = 'ontouchstart' in document.documentElement,
      mouseDownEvents = (supportsTouch) ? 'touchstart' : 'mousedown',
      mouseUpEvents = (supportsTouch) ? 'touchend' : 'mouseup mouseleave',
      animationDuration = 600;


angular.module(moduleName, [])
  .directive('muiButton', function() {
    return {
      restrict: 'AE',
      scope: {
        type: '@?'
      },
      replace: true,
      template: '<button class="mui-btn" type={{type}} mui-ripple ng-transclude></button>',
      transclude: true,
      link: function(scope, element, attrs) {
        var isUndef = angular.isUndefined,
            el = element[0];

        // disable MUI js
        el._muiDropdown = true;
        el._muiRipple = true;

        // handle disabled attribute
        if (!isUndef(attrs.disabled) && isUndef(attrs.ngDisabled)) {
          element.prop('disabled', true);
        }

        // set button styles        
        angular.forEach(['variant', 'color', 'size'], function(attrName) {
          var attrVal = attrs[attrName];
          if (attrVal) element.addClass('mui-btn--' + attrVal);
        });
      }
    };
  })
  .directive('muiRipple', ['$timeout', function($timeout) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        // add mousedown event handler
        element.on(mouseDownEvents, mouseDownHandler);
      }
    }
  }]);


/**
 * MouseDown event handler.
 * @param {Event} ev - The DOM event
 */
function mouseDownHandler(ev) {
  var element = angular.element(this);

  // exit if disabled
  if (element.prop('disabled')) return;
  
  // add mouseup event handler once
  if (!this.muiMouseUp) {
    element.on(mouseUpEvents, mouseUpHandler);
    this.muiMouseUp = true;
  }

  // get (x, y) position of click
  var offset = jqLite.offset(this),
      clickEv = (ev.type === 'touchstart') ? ev.touches[0] : ev,
      xPos = clickEv.pageX - offset.left,
      yPos = clickEv.pageY - offset.top,
      diameter,
      radius,
      rippleEl;

  // calculate diameter
  diameter = Math.sqrt(offset.width * offset.width +
                       offset.height * offset.height) * 2;
  
  // create ripple element
  rippleEl = angular.element('<div class="' + rippleClass + '"></div>');
  
  radius = diameter / 2;
  
  rippleEl.css({
    height: diameter + 'px',
    width: diameter + 'px',
    top: (yPos - radius) + 'px',
    left: (xPos - radius) + 'px'
  });
  
  // add to DOM
  element.append(rippleEl);  

  // start animation
  util.requestAnimationFrame(function() {
    rippleEl.addClass('mui--animate-in mui--active');
  });
}


/**
 * MouseUp event handler.
 * @param {Event} ev - The DOM event
 */
function mouseUpHandler(ev) {
  var children = this.children,
      i = children.length,
      rippleEls = [],
      el;

  // animate out ripples
  while (i--) {
    el = children[i];
    if (jqLite.hasClass(el, rippleClass)) {
      jqLite.addClass(el, 'mui--animate-out');
      rippleEls.push(el);
    }
  }

  // remove ripples after animation
  if (rippleEls.length) {
    setTimeout(function() {
      var i = rippleEls.length,
          el,
          parentNode;

      // remove elements
      while (i--) {
        el = rippleEls[i];
        parentNode = el.parentNode;
        if (parentNode) parentNode.removeChild(el);
      }
    }, animationDuration);
  }
}


/** Define module API */
export default moduleName;
