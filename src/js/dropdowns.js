'use strict';

var config = require('./config.js'),
    jqLite = require('./lib/jqLite.js'),
    wrapperClass = config.cssPrfx + 'dropdown',
    openClass = config.cssPrfx + 'open',
    menuClass = config.cssPrfx + 'dropdown-menu',
    disabledClass = config.cssPrfx + 'disabled';


function clickHandler(ev) {
  // only left clicks
  if (ev.button !== 0) return;
  
  var toggleEl = ev.target,
      parentEl = toggleEl.parentNode;
  
  // exit if parent doesn't have wrapper class
  if (!parentEl || !jqLite.hasClass(parentEl, wrapperClass)) return;
  
  // exit if toggle button is disabled
  if (toggleEl.getAttribute('disabled') !== null ||
      jqLite.hasClass(toggleEl, disabledClass)) {
    return;
  }

  toggleDropdown(parentEl, toggleEl);
}


function toggleDropdown(parentEl, toggleEl) {
  // exit if dropdown is already open
  if (jqLite.hasClass(parentEl, openClass)) return;
  
  // get menu element
  var childEl = parentEl.firstElementChild;
  while (childEl) {
    if (jqLite.hasClass(childEl, menuClass)) break;
    childEl = childEl.nextElementSibling;
  }

  // exit if no menu found
  if (!childEl) return;

  var menuEl = childEl,
      doc = parentEl.ownerDocument;
  
  // ignore clicks inside menu
  function ignoreClicksFn(ev) {
    ev.stopPropagation();
  }
  
  jqLite.on(menuEl, 'click', ignoreClicksFn);
  
  // close dropdown when user clicks outside of menu
  jqLite.on(doc, 'click', function closeDropdownFn(ev) {
    jqLite.removeClass(parentEl, openClass);

    // remove event handlers
    jqLite.off(doc, 'click', closeDropdownFn);
    jqLite.off(menuEl, 'click', ignoreClicksFn);
  });

  // position menu element below toggle button
  var parentRect = parentEl.getBoundingClientRect(),
      toggleRect = toggleEl.getBoundingClientRect();

  var top = toggleRect.top - parentRect.top + toggleRect.height;
  jqLite.css(menuEl, 'top', top + 'px');
  
  // add open class to wrapper
  jqLite.addClass(parentEl, openClass);
}

  
/**************************
 * Module API
 **************************/
module.exports = {
  initListeners: function() {
    // attach to global click event
    jqLite.on(document, 'click', clickHandler);
  }
};
