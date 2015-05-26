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
  wrapperEl.tabIndex = -1;
  jqLite.on(selectEl, 'focus', selectFocusHandler);
  jqLite.on(wrapperEl, 'focus', wrapperFocusHandler);
  
  // handle key presses
  jqLite.on(wrapperEl, 'keydown', keydownHandler);

  // capture clicks
  jqLite.on(selectEl, 'mousedown', mousedownHandler);
  jqLite.on(selectEl, 'click', clickHandler);
}


/**
 * Handle focus event on select element.
 */
function selectFocusHandler() {
  var selectEl = this,
      parentEl = selectEl.parentNode,
      origIndex = selectEl.tabIndex;

  // disable tabfocus once
  selectEl.tabIndex = -1;
  jqLite.one(parentEl, 'blur', function() {selectEl.tabIndex = origIndex;});
  
  // defer focus to parent
  parentEl.focus();
}


/**
 * Handle focus event on wrapper element.
 */
function wrapperFocusHandler() {
  if (this._selectEl.disabled) this.blur();
}


/**
 * Handle keydown events on wrapper element
 * @param {Event} ev - The DOM event
 */
function keydownHandler(ev) {
  // spacebar, down, up
  if (ev.keyCode === 32 || ev.keyCode === 38 || ev.keyCode === 40) {
    // prevent window scroll
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
      selectedPos = 0,
      top = 13,
      optionEl,
      itemEl,
      i;

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
  menuEl.children[selectedPos].setAttribute('selected', true);
  
  // set position
  top += selectedPos * 42;
  jqLite.css(menuEl, 'top', '-' + top + 'px');

  // attach click handlers
  attachMenuClickHandlers(menuEl, selectEl, selectedPos);

  // add to DOM
  selectEl.parentNode.appendChild(menuEl);
}


/**
 * Attach click handlers to menu element.
 * @param menuEl {Element} - The menu element
 * @param selectEl {Element} - The original select element
 * @param selectedPos {Integer} - The index of the currently selected item
 */
function attachMenuClickHandlers(menuEl, selectEl, selectedPos) {
  function destroyFn() {
    menuEl.parentNode.removeChild(menuEl);
    selectEl.parentNode.focus();
    jqLite.off(document, 'click', destroyFn);
  }
  
  // menu element
  jqLite.on(menuEl, 'click', function(ev) {
    // don't allow events to bubble
    ev.stopPropagation();
    
    var pos = ev.target._muiPos;
    
    // ignore clicks on non-items
    if (pos === undefined) return;
    
    // select option
    selectEl.children[selectedPos].selected = false;
    selectEl.children[pos].selected = true;
    
    // destroy menu
    destroyFn();
  });

  // destroy when user clicks outside of menu
  setTimeout(function() {jqLite.on(document, 'click', destroyFn);}, 0);
}


/**
 * Handle clicks on menu element.
 * @param {Event} - The DOM event
 */
function menuClickHandler(ev) {
  // don't allow events to bubble
  ev.stopPropagation();
  
  var menuEl = this,
      selectEl = menuEl._selectEl,
      pos = ev.target._muiPos;
  
  // ignore clicks on non-items
  if (pos === undefined) return;
  
  // select option
  selectEl.children[selectedPos].selected = false;
  selectEl.children[pos].selected = true;
  
  // destroy menu
  menuEl.parentNode.removeChild(menuEl);
  selectEl.parentNode.focus();
}


/**
 * Handle clicks on window.
 */
function docClickHandler(ev) {
  menuEl.parentNode.removeChild(menuEl);
  selectEl.parentNode.focus();
  
  jqLite.off(window, 'click', destroyFn);
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
