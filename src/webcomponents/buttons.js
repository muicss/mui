/**
 * MUI WebComponents buttons module
 * @module webcomponents/buttons
 */

'use strict';


var config = require('../js/config.js'),
    jqLite = require('../js/lib/jqLite.js'),
    btnClass = 'mui-btn',
    btnTagName = btnClass;


/**
 * Class representing a button.
 * @class
 */
var BtnProto = Object.create(HTMLElement.prototype);


/** Button createdCallback */
BtnProto.createdCallback = function() {
  var root = this.createShadowRoot(),
      innerEl = document.createElement('button');

  var attrs = {
    type: this.getAttribute('type'),
    color: this.getAttribute('color') || 'default',
    depth: this.getAttribute('depth') || 'normal',
    size: this.getAttribute('size') || 'normal',
    disabled: this.getAttribute('disabled')
  }

  // populate innerEl
  for (var i=0; i < this.childNodes.length; i++) {
    innerEl.appendChild(this.childNodes[i]);
  }

  jqLite.addClass(innerEl, btnClass);

  // color
  jqLite.addClass(innerEl, btnClass + '-' + attrs.color);

  // depth
  if (attrs.depth !== 'normal') {
    jqLite.addClass(innerEl, btnClass + '-' + attrs.depth);
  }

  // floating
  if (attrs.type === 'floating') {
    jqLite.addClass(innerEl, btnClass + '-floating');

    if (attrs.size !== 'normal') {
      jqLite.addClass(innerEl, btnClass + '-floating-' + attrs.size);
    }
  } else if (attrs.size !== 'normal') {
    // size
    jqLite.addClass(innerEl, btnClass + '-' + attrs.size);
  }

  // disabled
  if (attrs.disabled !== null) innerEl.setAttribute('disabled', 'disabled');

  root.appendChild(_getStyleEl().cloneNode(true));
  root.appendChild(innerEl);
};


// ----------------------------
// Utilities
// ----------------------------
var styleEl;


function _getStyleEl() {
  // get or create cached element
  if (styleEl === undefined) {
    styleEl = document.createElement('style');
    styleEl.innerHTML = require('mui.min.css');
  }

  return styleEl;
}


/** Define module API */
module.exports = {
  /** Register module elements */
  registerElements: function() {
    var BtnElement = document.registerElement(btnTagName, {
      prototype: BtnProto
    });

    return {
      BtnElement: BtnElement
    }
  }
};
