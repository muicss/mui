/**
 * MUI CSS/JS select module
 * @module forms/select
 */

'use strict';


var jqLite = require('../lib/jqLite.js'),
    util = require('../lib/util.js'),
    wrapperClass = 'mui-select',
    cssSelector = '.mui-select select';


/**
 * Initialize select element.
 * @param {Element} selectEl - The select element.
 */
function initialize(selectEl) {
  // check flag
  if (selectEl._muiSelect === true) return;
  else selectEl._muiSelect = true;

  // disable dropdown selector
  jqLite.on(selectEl, 'mousedown', function(ev) {
    ev.stopPropagation();
    ev.preventDefault();
  });

  jqLite.on(selectEl, 'keydown', function(ev) {
    // spacebar, down, up
    if (ev.keyCode === 32 || ev.keyCode === 38 || ev.keyCode === 40) {
      ev.stopPropagation();
      ev.preventDefault();
    }
  });
  
  // attach click handler
  jqLite.on(selectEl, 'click', clickHandler);
}


/**
 * Handle click events on select element.
 * @param {Event} ev - The DOM event
 */
function clickHandler(ev) {
  // only left clicks
  if (ev.button !== 0) return;

  var selectEl = this;

  // exit if disabled
  if (selectEl.getAttribute('disabled') !== null) return;

  var menuEl = document.createElement('div');
  jqLite.css(menuEl, {
    position: 'absolute',
    top: 0,
    width: '10px',
    height: '10px',
    backgroundColor: 'red'
  });

  selectEl.parentNode.appendChild(menuEl);
}


/** Define module API */
module.exports = {
  /** Initialize module listeners */
  initListeners: function() {
    var doc = document;

    // markup elements available when method is called
    var elList = doc.querySelectorAll(cssSelector);
    for (var i=elList.length - 1; i >= 0; i--) initialize(elList[i]);

    // listen for new elements
    util.onNodeInserted(function(el) {
      if (el.tagName === 'SELECT' &&
          jqLite.hasClass(el.parentNode, wrapperClass)) {
        initialize(el);
      }
    });
  }
};
