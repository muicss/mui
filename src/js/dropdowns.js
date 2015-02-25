'use strict';

var config = require('./config.js'),
    jqLite = require('./lib/jqLite.js'),
    wrapperClass = config.cssPrfx + 'dropdown',
    openClass = config.cssPrfx + 'open',
    menuClass = config.cssPrfx + 'dropdown-menu';


function initialize(wrapperEl) {
  // check flag
  if (wrapperEl._muiDropdown === true) return;
  else wrapperEl._muiDropdown = true;

  var el;

  // attach click handler to toggle button
  for (var i=wrapperEl.childNodes.length - 1; i >= 0; i--) {
    el = wrapperEl.childNodes[i];

    if (el.getAttribute && el.getAttribute('data-toggle') === 'dropdown') {
      jqLite.on(el, 'click', clickHandler);
      break;
    }
  }
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
      doc = wrapperEl.ownerDocument,
      menuEl;

  // get menu element
  menuEl = toggleEl.nextElementSibling;
  while (menuEl) {
    if (jqLite.hasClass(menuEl, menuClass)) break;
    menuEl = menuEl.nextElementSibling;
  }

  // exit if no menu found
  if (!menuEl) return;

  // method to ignore clicks inside menu
  function stopPropagationFn(ev) {
    ev.stopPropagation();
  }

  // method to close dropdown
  function closeDropdownFn() {
    jqLite.removeClass(wrapperEl, openClass);
      
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
    jqLite.addClass(wrapperEl, openClass);

    // close dropdown when user clicks outside of menu
    jqLite.on(toggleEl, 'click', stopPropagationFn);
    jqLite.on(menuEl, 'click', stopPropagationFn);    
    jqLite.on(doc, 'click', closeDropdownFn);
  }

  // toggle dropdown
  if (jqLite.hasClass(wrapperEl, openClass)) closeDropdownFn();
  else openDropdownFn();
}

  
/**************************
 * Module API
 **************************/
module.exports = {
  initListeners: function() {
    var doc = document;

    // markup elements available when method is called
    var elList = doc.getElementsByClassName(wrapperClass);
    for (var i=elList.length - 1; i >= 0; i--) initialize(elList[i]);

    // listen for new elements
    var MutationObserver = window.MutationObserver || 
      require('mutation-observer');

    var observer = new MutationObserver(function(mutations) {
      var addedNodes,
          j,
          node;

      for (var i=mutations.length - 1; i >= 0; i--) {
        addedNodes = mutations[i].addedNodes;

        for (j=addedNodes.length - 1; j >= 0; j--) {
          node = addedNodes[j];

          if (node.tagName === 'DIV' &&
              jqLite.hasClass(node, wrapperClass)) {
            initialize(node);
          }
        }
      }
    });

    observer.observe(doc.body, {childList: true, subtree: true});
  }
};
