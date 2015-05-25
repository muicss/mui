/**
 * MUI CSS/JS select module
 * @module forms/select
 */

'use strict';


var jqLite = require('../lib/jqLite.js'),
    util = require('../lib/util.js'),
    wrapperClass = 'mui-select',
    cssSelector = '.mui-select > select',
    menuClass = 'mui-select-menu';


/**
 * Initialize select element.
 * @param {Element} selectEl - The select element.
 */
function initialize(selectEl) {
  // check flag
  if (selectEl._muiSelect === true) return;
  else selectEl._muiSelect = true;

  var wrapperEl = selectEl.parentNode;

  // cache element
  wrapperEl._selectEl = selectEl;
  
  // handle focus
  wrapperEl.setAttribute('tabindex', '-1');
  jqLite.on(selectEl, 'focus', focusHandler);

  // handle key presses
  jqLite.on(wrapperEl, 'keydown', keydownHandler);

  // capture clicks
  jqLite.on(selectEl, 'mousedown', mousedownHandler);
  jqLite.on(selectEl, 'click', clickHandler);
}


/**
 * Handle focus events.
 */
function focusHandler(ev) {
  var selectEl = this,
      parentEl = selectEl.parentNode,
      origIndex = selectEl.getAttribute('tabindex');

  // disable tabfocus once
  selectEl.setAttribute('tabindex', '-1');
  jqLite.one(parentEl, 'blur', function() {
    if (origIndex !== null) selectEl.setAttribute('tabindex', origIndex);
    else selectEl.removeAttribute('tabindex');
  });
  
  // defer focus to parent
  parentEl.focus();
}


/**
 * Handle keydown events on wrapper element
 * @param {Event} ev - The DOM event
 */
function keydownHandler(ev) {
  // spacebar, down, up
  if (ev.keyCode === 32 || ev.keyCode === 38 || ev.keyCode === 40) {
    ev.preventDefault();

    var selectEl = this._selectEl;
    if (selectEl.disabled !== true) showDropdown(selectEl);
  }
}


/**
 * Disable default dropdown on mousedown
 * @param {Event} ev - The DOM event
 */
function mousedownHandler(ev) {
  if (ev.button !== 0) return;
  ev.preventDefault();
}


/**
 * Handle click events on select element
 * @param {Event} ev - The DOM event
 */
function clickHandler(ev) {
  // only left clicks
  if (ev.button !== 0) return;
  showDropdown(this);
}


/**
 * Show options dropdown.
 * @param {Element} selectEl - The select element
 */
function showDropdown(selectEl) {
  var menuEl = document.createElement('div'),
      optionList = selectEl.children,
      m = optionList.length,
      optionEl,
      itemEl,
      i,
      selectedPos = 0,
      top = 13;

  // build menu
  menuEl.className = menuClass;
  
  // add options
  for (i=0; i < m; i++) {
    optionEl = optionList[i];
    
    itemEl = document.createElement('div');
    itemEl.textContent = optionEl.textContent;
    itemEl._muiPos = i;
    
    if (optionEl.selected) selectedPos = i;

    menuEl.appendChild(itemEl);
  }

  // add selected class
  menuEl.children[selectedPos].selected = true;
  
  // set position
  top += selectedPos * 42;
  jqLite.css(menuEl, 'top', '-' + top + 'px');

  // attach click handler
  jqLite.on(menuEl, 'click', function(ev) {
    var el = ev.target,
        pos = el._muiPos;

    // ignore clicks on non-items
    if (pos === undefined) return;

    // select option
    selectEl.children[selectedPos].selected = false;
    selectEl.children[pos].selected = true;
    
    // destroy menu
    menuEl.parentNode.removeChild(menuEl);
    selectEl.parentNode.focus();
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
