'use strict';

var jqLite = require('./lib/jqLite.js'),
    util = require('./lib/util.js'),
    attrSelector = '[data-toggle="dropdown"]',
    wrapperClass = 'mui-dropdown',
    openClass = 'mui-open',
    menuClass = 'mui-dropdown-menu',
    animationName = 'mui-dropdown-inserted';


function initialize(toggleEl) {
  // check flag
  if (toggleEl._muiDropdown === true) return;
  else toggleEl._muiDropdown = true;

  // attach click handler
  jqLite.on(toggleEl, 'click', clickHandler);
}


function clickHandler(ev) {
  // only left clicks
  if (ev.button !== 0) return;

  var toggleEl = this;
  
  // exit if toggle button is disabled
  if (toggleEl.getAttribute('disabled') !== null) return;

  // let event bubble before toggling dropdown
  setTimeout(function() {
    if (!ev.defaultPrevented) toggleDropdown(toggleEl);
  }, 0);
}


function toggleDropdown(toggleEl) {
  var wrapperEl = toggleEl.parentNode,
      menuEl = toggleEl.nextElementSibling,
      doc = wrapperEl.ownerDocument;

  // exit if no menu element
  if (!menuEl || !jqLite.hasClass(menuEl, menuClass)) {
    util.raiseError('Dropdown menu element not found');
    return;
  }

  // method to ignore clicks inside menu
  function stopPropagationFn(ev) {
    ev.stopPropagation();
  }

  // method to close dropdown
  function closeDropdownFn() {
    jqLite.removeClass(menuEl, openClass);
      
    // remove event handlers
    jqLite.off(doc, 'click', closeDropdownFn);
    jqLite.off(menuEl, 'click', stopPropagationFn);
    jqLite.off(toggleEl, 'click', stopPropagationFn);
  }

  // method to open dropdown
  function openDropdownFn() {
    // position menu element below toggle button
    var wrapperRect = wrapperEl.getBoundingClientRect(),
        toggleRect = toggleEl.getBoundingClientRect();

    var top = toggleRect.top - wrapperRect.top + toggleRect.height;
    jqLite.css(menuEl, 'top', top + 'px');

    // add open class to wrapper
    jqLite.addClass(menuEl, openClass);

    // close dropdown when user clicks outside of menu
    jqLite.on(toggleEl, 'click', stopPropagationFn);
    jqLite.on(menuEl, 'click', stopPropagationFn);    
    jqLite.on(doc, 'click', closeDropdownFn);
  }

  // toggle dropdown
  if (jqLite.hasClass(menuEl, openClass)) closeDropdownFn();
  else openDropdownFn();
}

  
/**************************
 * Module API
 **************************/
module.exports = {
  initListeners: function() {
    var doc = document;

    // markup elements available when method is called
    var elList = doc.querySelectorAll(attrSelector);
    for (var i=elList.length - 1; i >= 0; i--) initialize(elList[i]);

    // listen for new elements
    util.onAnimationStart(animationName, initialize);
  }
};
