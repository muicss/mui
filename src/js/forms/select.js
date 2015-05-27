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

  // handle touch devices
  jqLite.on(selectEl, 'touchstart', selectTouchstartHandler);
  
  // handle focus
  wrapperEl.tabIndex = -1;
  jqLite.on(selectEl, 'focus', selectFocusHandler);
  jqLite.on(wrapperEl, 'focus', wrapperFocusHandler);
  
  // capture clicks
  jqLite.on(selectEl, 'mousedown', selectMousedownHandler);
  jqLite.on(selectEl, 'click', selectClickHandler);
}


/**
 * Use default on touch devices
 */
function selectTouchstartHandler() {
  // set flag
  this._useDefault = true;
}


/**
 * Handle focus event on select element.
 */
function selectFocusHandler() {
  var selectEl = this,
      parentEl = selectEl.parentNode,
      origIndex = selectEl.tabIndex;

  // check flag
  if (selectEl._useDefault === true) return;
  
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
  var selectEl = this._selectEl;
  
  // firefox bugfix
  if (selectEl.disabled) return this.blur();

  function keydownHandler(ev) {
    // spacebar, down, up
    if (ev.keyCode === 32 || ev.keyCode === 38 || ev.keyCode === 40) {
      // prevent window scroll
      ev.preventDefault();

      if (selectEl.disabled !== true) showDropdown(selectEl);
    }
  }
  
  // attach keypress handler
  jqLite.on(document, 'keydown', keydownHandler);

  // remove on blur
  jqLite.one(this, 'blur', function() {
    jqLite.off(document, 'keydown', keydownHandler);
  });
}


/**
 * Disable default dropdown on mousedown
 * @param {Event} ev - The DOM event
 */
function selectMousedownHandler(ev) {
  if (ev.button !== 0 || this._useDefault === true) return;
  ev.preventDefault();
}


/**
 * Handle click events on select element
 * @param {Event} ev - The DOM event
 */
function selectClickHandler(ev) {
  // only left clicks
  if (ev.button !== 0) return;
  showDropdown(this);
}


/**
 * Show options dropdown.
 * @param {Element} selectEl - The select element
 */
function showDropdown(selectEl) {
  // check & reset flag
  if (selectEl._useDefault === true) {
    selectEl._useDefault = false;
    return;
  }

  var menuEl = new Menu(selectEl);
}


/**
 * Creates a new Menu
 * @class
 */
function Menu(selectEl) {
  this.currentIndex = 0;
  this.selectEl = selectEl;
  this.menuEl = this._createMenuEl(selectEl); 

  // add to DOM
  selectEl.parentNode.appendChild(this.menuEl);
  selectEl.parentNode.blur();
  this._attachEventHandlers();
}


Menu.prototype._createMenuEl = function(selectEl) {
  var optionEl, itemEl, i;
  
  var menuEl = document.createElement('div'),
      optionList = selectEl.children,
      m = optionList.length,
      selectedPos = 0,
      top = 13;
  
  // create element
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

  // add selected attribute
  menuEl.children[selectedPos].setAttribute('selected', true);
  this.currentIndex = selectedPos;
  
  // set position
  top += selectedPos * 42;
  jqLite.css(menuEl, 'top', '-' + top + 'px');

  return menuEl;
}


Menu.prototype._attachEventHandlers = function() {
  var self = this;
  
  function keydownFn(ev) {
    var keyCode = ev.keyCode;

    // escape | up | down | enter
    if (keyCode === 27 || keyCode === 40 || keyCode === 38 || keyCode === 13) {
      ev.preventDefault();
    }

    if (keyCode === 27) {
      destroyFn();
    } else if (keyCode === 40) {
      self.increment();
    } else if (keyCode === 38) {
      self.decrement();
    } else if (keyCode === 13) {
      self.selectCurrent();
      destroyFn();
    }
  }

  function clickFn (ev) {
    // don't allow events to bubble
    ev.stopPropagation();
    
    var pos = ev.target._muiPos;
    
    // ignore clicks on non-items
    if (pos === undefined) return;
    
    // select option
    self.selectEl.children[self.currentIndex].selected = false;
    self.selectEl.children[pos].selected = true;
    
    // destroy menu
    destroyFn();
  }
  
  function destroyFn() {
    self.close();
    jqLite.off(document, 'click', destroyFn);
    jqLite.off(document, 'keydown', keydownFn);
  }

  setTimeout(function() {jqLite.on(document, 'click', destroyFn);}, 0);
  jqLite.on(document, 'keydown', keydownFn);
  jqLite.on(this.menuEl, 'click', clickFn);
}


Menu.prototype.increment = function() {
  if (this.currentIndex === this.menuEl.children.length - 1) return;
  
  this.menuEl.children[this.currentIndex].removeAttribute('selected');
  this.currentIndex += 1;
  this.menuEl.children[this.currentIndex].setAttribute('selected', true);
}


Menu.prototype.decrement = function() {
  if (this.currentIndex === 0) return;
  
  this.menuEl.children[this.currentIndex].removeAttribute('selected');
  this.currentIndex -= 1;
  this.menuEl.children[this.currentIndex].setAttribute('selected', true);
}


Menu.prototype.selectCurrent = function() {
  this.selectEl.children[this.currentIndex].selected = true;
}


Menu.prototype.close = function() {
  this.menuEl.parentNode.removeChild(this.menuEl);
  this.selectEl.parentNode.focus();  
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
