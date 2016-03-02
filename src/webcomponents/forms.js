/**
 * MUI WebComponents forms module
 * @module webcomponents/forms
 */

'use strict';


var jqLite = require('../js/lib/jqLite'),
    muiTextfield = require('../js/textfield'),
    textfieldClass = 'mui-textfield',
    floatingMod = '--float-label',
    textfieldTagName = textfieldClass;


/**
 * Class representing a Textfield element.
 * @class
 */
var TextfieldProto = Object.create(HTMLElement.prototype);


/** Textfield createdCallback */
TextfieldProto.createdCallback = function() {
  var root = this.createShadowRoot(),
      innerEl = document.createElement('div'),
      cls;

  var attrs = {
    type: this.getAttribute('type') || 'text',
    value: this.getAttribute('value'),
    placeholder: this.getAttribute('placeholder'),
    label: this.getAttribute('label'),
    floating: this.getAttribute('floating')
  };

  // set class
  cls = textfieldClass;
  if (attrs.floating !== null) cls += ' ' + textfieldClass + floatingMod;

  innerEl.setAttribute('class', cls);

  // add input element
  innerEl.appendChild(_createInputEl(attrs));

  // label element
  if (attrs.label) {
    var labelEl = _createLabelEl(attrs);
    innerEl.appendChild(labelEl);
  }

  // add to root
  root.appendChild(_getStyleEl().cloneNode(true));
  root.appendChild(innerEl);
}




// ============================================================================
// UTILITIES
// ============================================================================

var styleEl;


/**
 * Get or create style
 * @function
 */
function _getStyleEl() {
  if (styleEl === undefined) {
    styleEl = document.createElement('style');
    styleEl.innerHTML = require('mui.min.css');
  }

  return styleEl;
}


/**
 * Create input element.
 * @function
 */
function _createInputEl(attrs) {
  var inputEl;

  // input element
  if (attrs.type === 'textarea') {
    inputEl = document.createElement('textarea');
    if (attrs.value) inputEl.appendChild(document.createTextNode(attrs.value));
  } else {
    inputEl = document.createElement('input');
    inputEl.setAttribute('type', attrs.type);
    if (attrs.value) inputEl.setAttribute('value', attrs.value);
  }

  if (attrs.placeholder) {
    inputEl.setAttribute('placeholder', attrs.placeholder);
  }

  // add event listeners
  muiTextfield.initialize(inputEl);
  
  return inputEl;
}


/**
 * Create label element.
 * @function
 */
function _createLabelEl(attrs) {
  var labelEl = document.createElement('label');
  labelEl.appendChild(document.createTextNode(attrs.label));
  
  return labelEl;
}


/** Define module API */
module.exports = {
  /** Register module elements */
  registerElements: function() {
    var TextfieldElement = document.registerElement(textfieldTagName, {
      prototype: TextfieldProto
    });

    return {
      TextfieldElement: TextfieldElement
    };
  }
};
