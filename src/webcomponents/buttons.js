/**
 * MUI WebComponents buttons module
 * @module webcomponents/buttons
 */

'use strict';


var config = require('../js/config'),
    jqLite = require('../js/lib/jqLite'),
    btnClass = 'mui-btn',
    btnTagName = btnClass,
    btnAttrs = {style: 1, color: 1, size: 1};


/**
 * Class representing a button.
 * @class
 */
var BtnProto = Object.create(HTMLElement.prototype);


/** Button createdCallback */
BtnProto.createdCallback = function() {
  var root = this.createShadowRoot(),
      innerEl = document.createElement('button'),
      cls = btnClass,
      k,
      v;

  // populate innerEl
  for (var i=0; i < this.childNodes.length; i++) {
    innerEl.appendChild(this.childNodes[i]);
  }

  // style|color|size
  for (k in btnAttrs) {
    v = this.getAttribute(k);
    if (v !== 'default') cls += ' ' + btnClass + '--' + v;
  }

  jqLite.addClass(innerEl, cls);

  // disabled
  if (this.getAttribute('disabled') !== null) {
    innerEl.setAttribute('disabled', 'disabled');
  }

  root.appendChild(_getStyleEl().cloneNode(true));
  root.appendChild(innerEl);
};




// ============================================================================
// UTILITIES
// ============================================================================

var styleEl;


/**
 * Get or create a style element.
 * @function
 */
function _getStyleEl() {
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
