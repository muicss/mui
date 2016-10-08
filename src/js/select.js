/**
 * MUI CSS/JS select module
 * @module forms/select
 */

'use strict';


var jqLite = require('./lib/jqLite'),
    util = require('./lib/util'),
    animationHelpers = require('./lib/animationHelpers'),
    formlib = require('./lib/forms'),
    wrapperClass = 'mui-select',
    cssSelector = '.mui-select > select',
    menuClass = 'mui-select__menu',
    selectedClass = 'mui--is-selected',
    disabledClass = 'mui--is-disabled',
    doc = document,
    win = window;


/**
 * Initialize select element.
 * @param {Element} selectEl - The select element.
 */
function initialize(selectEl) {
  // check flag
  if (selectEl._muiSelect === true) return;
  else selectEl._muiSelect = true;

  // use default behavior on touch devices
  if ('ontouchstart' in doc.documentElement) return;

  // initialize element
  new Select(selectEl);

  // set flag
  selectEl._muiJs = true;
}


/**
 * Creates a new Select object
 * @class
 */
function Select(selectEl) {
  var wrapperEl = selectEl.parentNode;

  // instance variables
  this.selectEl = selectEl;
  this.wrapperEl = wrapperEl;
  this.useDefault = false;  // currently unused but let's keep just in case
  this.isOpen = false;
  this.menu = null;

  // NOTE: To get around cross-browser issues with <select> behavior we will
  //       defer focus to the parent element and handle events there

  // make wrapper tab focusable, remove tab focus from <select>
  if (!selectEl.disabled) wrapperEl.tabIndex = 0;
  if (!this.useDefault) selectEl.tabIndex = -1;

  var cb = util.callback;

  // prevent built-in menu from opening on <select>
  jqLite.on(selectEl, 'mousedown', cb(this, 'onInnerMouseDown'));

  // attach event listeners for custom menu
  jqLite.on(wrapperEl, 'click', cb(this, 'onWrapperClick'));
  jqLite.on(wrapperEl, 'blur focus', cb(this, 'onWrapperBlurOrFocus'));
  jqLite.on(wrapperEl, 'keydown', cb(this, 'onWrapperKeyDown'));

  // add element to detect 'disabled' change (using sister element due to 
  // IE/Firefox issue
  var el = document.createElement('div');
  el.className = 'mui-event-trigger';
  wrapperEl.appendChild(el);

  // handle 'disabled' add/remove
  jqLite.on(el, animationHelpers.animationEvents, function(ev) {
    // no need to propagate
    ev.stopPropagation();

    if (ev.animationName === 'mui-node-disabled') {
      ev.target.parentNode.removeAttribute('tabIndex');
    } else {
      ev.target.parentNode.tabIndex = 0;
    }    
  });
}


/**
 * Dispatch focus and blur events on inner <select> element.
 * @param {Event} ev - The DOM event
 */
Select.prototype.onWrapperBlurOrFocus = function(ev) {
  util.dispatchEvent(this.selectEl, ev.type, false, false);
}



/**
 * Disable default dropdown on mousedown.
 * @param {Event} ev - The DOM event
 */
Select.prototype.onInnerMouseDown = function(ev) {
  // only left clicks
  if (ev.button !== 0 || this.useDefault) return;

  // prevent built-in menu from opening
  ev.preventDefault();
}


/**
 * Handle keydown events when wrapper is focused
 **/
Select.prototype.onWrapperKeyDown = function(ev) {
  // check flag
  if (this.useDefault || ev.defaultPrevented) return;

  var keyCode = ev.keyCode;

  if (this.isOpen === false) {
    // spacebar, down, up
    if (keyCode === 32 || keyCode === 38 || keyCode === 40) {
      ev.preventDefault();

      // open custom menu
      this.renderMenu();
    }

  } else {
    var menu = this.menu;

    // tab
    if (keyCode === 9) return menu.destroy();
  
    // escape | up | down | enter
    if (keyCode === 27 || keyCode === 40 || keyCode === 38 || keyCode === 13) {
      ev.preventDefault();
    }

    if (keyCode === 27) {
      menu.destroy();
    } else if (keyCode === 40) {
      menu.increment();
    } else if (keyCode === 38) {
      menu.decrement();
    } else if (keyCode === 13) {
      menu.selectCurrent();
      menu.destroy();
    }
  }
}


/**
 * Handle click events on wrapper element.
 * @param {Event} ev - The DOM event
 */
Select.prototype.onWrapperClick = function(ev) {
  // only left clicks, check default and disabled flags
  if (ev.button !== 0 || this.useDefault || this.selectEl.disabled) return;

  // focus wrapper
  this.wrapperEl.focus();

  // open menu
  this.renderMenu();
}


/**
 * Render options dropdown.
 */
Select.prototype.renderMenu = function() {
  // check flag
  if (this.isOpen) return;

  // render custom menu and reset flag
  var self = this;
  this.menu = new Menu(this.wrapperEl, this.selectEl, function() {
    self.isOpen = false;
    self.menu = null;
    self.wrapperEl.focus();
  });

  // set flag
  this.isOpen = true;
}


/**
 * Creates a new Menu
 * @class
 */
function Menu(wrapperEl, selectEl, wrapperCallbackFn) {
  // add scroll lock
  util.enableScrollLock();

  // instance variables
  this.itemArray = [];
  this.origPos = null;
  this.currentPos = null;
  this.selectEl = selectEl;
  this.wrapperEl = wrapperEl;
  this.menuEl = this._createMenuEl(wrapperEl, selectEl);

  var cb = util.callback;

  this.onClickCB = cb(this, 'onClick');
  this.destroyCB = cb(this, 'destroy');
  this.wrapperCallbackFn = wrapperCallbackFn;

  // add to DOM
  wrapperEl.appendChild(this.menuEl);
  jqLite.scrollTop(this.menuEl, this.menuEl._muiScrollTop);

  // attach event handlers
  jqLite.on(this.menuEl, 'click', this.onClickCB);
  jqLite.on(win, 'resize', this.destroyCB);

  // attach event handler after current event loop exits
  var fn = this.destroyCB;
  setTimeout(function() {jqLite.on(doc, 'click', fn);}, 0);
}


/**
 * Create menu element
 * @param {Element} selectEl - The select element
 */
Menu.prototype._createMenuEl = function(wrapperEl, selectEl) {
  var menuEl = doc.createElement('div'),
      childEls = selectEl.children,
      itemArray = this.itemArray,
      itemPos = 0,
      selectedPos = 0,
      selectedRow = 0,
      docFrag = document.createDocumentFragment(),  // for speed
      loopEl,
      rowEl,
      optionEls,
      inGroup,
      i,
      iMax,
      j,
      jMax;

  menuEl.className = menuClass;

  for (i=0, iMax=childEls.length; i < iMax; i++) {
    loopEl = childEls[i];

    if (loopEl.tagName === 'OPTGROUP') {
      // add row item to menu
      rowEl = doc.createElement('div');
      rowEl.textContent = loopEl.label;
      rowEl.className = 'mui-optgroup__label';
      docFrag.appendChild(rowEl);

      inGroup = true;
      optionEls = loopEl.children;
    } else {
      inGroup = false;
      optionEls = [loopEl];
    }

    // loop through option elements
    for (j=0, jMax=optionEls.length; j < jMax; j++) {
      loopEl = optionEls[j];

      // add row item to menu
      rowEl = doc.createElement('div');
      rowEl.textContent = loopEl.textContent;

      // handle optgroup options
      if (inGroup) jqLite.addClass(rowEl, 'mui-optgroup__option');

      if (loopEl.disabled) {
        // do not attach muiIndex to disable <option> elements to make them
        // unselectable.
        jqLite.addClass(rowEl, disabledClass);
      } else {
        rowEl._muiIndex = loopEl.index;
        rowEl._muiPos = itemPos;

        // handle selected options
        if (loopEl.selected) {
          jqLite.addClass(rowEl, selectedClass);
          selectedRow = menuEl.children.length;
          selectedPos = itemPos;
        }

        // add to item array
        itemArray.push(rowEl);
        itemPos += 1;
      }

      docFrag.appendChild(rowEl);
    }
  }

  // add rows to menu
  menuEl.appendChild(docFrag);

  // save indices
  this.origPos = selectedPos;
  this.currentPos = selectedPos;

  // set position
  var props = formlib.getMenuPositionalCSS(
    wrapperEl,
    menuEl.children.length,
    selectedRow
  );

  jqLite.css(menuEl, props);
  menuEl._muiScrollTop = props.scrollTop;

  return menuEl;
}


/**
 * Handle click events on menu element.
 * @param {Event} ev - The DOM event
 */
Menu.prototype.onClick = function(ev) {
  // don't allow events to bubble
  ev.stopPropagation();

  var item = ev.target,
      index = item._muiIndex;

  // ignore clicks on non-items                                               
  if (index === undefined) return;

  // select option
  this.currentPos = item._muiPos;
  this.selectCurrent();

  // destroy menu
  this.destroy();
}


/**
 * Increment selected item
 */
Menu.prototype.increment = function() {
  if (this.currentPos === this.itemArray.length - 1) return;

  // un-select old row
  jqLite.removeClass(this.itemArray[this.currentPos], selectedClass);

  // select new row
  this.currentPos += 1;
  jqLite.addClass(this.itemArray[this.currentPos], selectedClass);
}


/**
 * Decrement selected item
 */
Menu.prototype.decrement = function() {
  if (this.currentPos === 0) return;

  // un-select old row
  jqLite.removeClass(this.itemArray[this.currentPos], selectedClass);

  // select new row
  this.currentPos -= 1;
  jqLite.addClass(this.itemArray[this.currentPos], selectedClass);
}


/**
 * Select current item
 */
Menu.prototype.selectCurrent = function() {
  if (this.currentPos !== this.origPos) {
    this.selectEl.selectedIndex = this.itemArray[this.currentPos]._muiIndex;

    // trigger change event
    util.dispatchEvent(this.selectEl, 'change', false, false);
  }
}


/**
 * Destroy menu and detach event handlers
 */
Menu.prototype.destroy = function() {
  // remove scroll lock
  util.disableScrollLock(true);

  // remove event handlers
  jqLite.off(this.menuEl, 'click', this.clickCallbackFn);
  jqLite.off(doc, 'click', this.destroyCB);
  jqLite.off(win, 'resize', this.destroyCB);

  // remove element and execute wrapper callback
  var parentNode = this.menuEl.parentNode;
  if (parentNode) {
    parentNode.removeChild(this.menuEl);
    this.wrapperCallbackFn();
  }
}


/** Define module API */
module.exports = {
  /** Initialize module listeners */
  initListeners: function() {
    // markup elements available when method is called
    var elList = doc.querySelectorAll(cssSelector),
        i = elList.length;
    while (i--) initialize(elList[i]);

    // listen for mui-node-inserted events
    animationHelpers.onAnimationStart('mui-select-inserted', function(ev) {
      initialize(ev.target);
    });
  }
};
