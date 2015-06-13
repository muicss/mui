/**
 * MUI CSS/JS tabs module
 * @module tabs
 */

'use strict';


var jqLite = require('./lib/jqLite.js'),
    util = require('./lib/util.js'),
    attrKey = 'data-mui-toggle',
    attrSelector = '[' + attrKey + '="tab"]',
    controlsAttrKey = 'data-mui-controls',
    activeClass = 'mui-active';


/**
 * Initialize the toggle element
 * @param {Element} toggleEl - The toggle element.
 */
function initialize(toggleEl) {
  // check flag
  if (toggleEl._muiTabs === true) return;
  else toggleEl._muiTabs = true;

  // attach click handler
  jqLite.on(toggleEl, 'click', clickHandler);
}


/**
 * Handle clicks on the toggle element.
 * @param {Event} ev - The DOM event.
 */
function clickHandler(ev) {
  // only left clicks
  if (ev.button !== 0) return;

  var toggleEl = this;

  // exit if toggle element is disabled
  if (toggleEl.getAttribute('disabled') !== null) return;

  // let event bubble before toggling tab
  setTimeout(function() {
    if (!ev.defaultPrevented) activateTab(toggleEl);
  }, 0);
}


/**
 * Activate the tab controlled by the toggle element.
 * @param {Element} toggleEl - The toggle element.
 */
function activateTab(toggleEl) {
  var tabEl = toggleEl.parentNode,
      paneId = toggleEl.getAttribute(controlsAttrKey),
      paneEl = document.getElementById(paneId),
      tabs,
      panes,
      el,
      i;

  // raise error if pane doesn't exist
  if (!paneEl) util.raiseError('Tab pane "' + paneId + '" not found');

  // de-activate tab siblings
  tabs = tabEl.parentNode.children;
  for (i=tabs.length - 1; i >= 0; i--) {
    el = tabs[i];
    if (el !== tabEl) jqLite.removeClass(el, activeClass);
  }
  
  // de-activate pane siblings
  panes = paneEl.parentNode.children;
  for (i=panes.length - 1; i >= 0; i--) {
    el = panes[i];
    if (el !== paneEl) jqLite.removeClass(el, activeClass);
  }
  
  // activate tab and pane
  jqLite.addClass(tabEl, activeClass);
  jqLite.addClass(paneEl, activeClass);
}


/** Define module API */
module.exports = {
  /** Initialize module listeners */
  initListeners: function() {
    // markup elements available when method is called
    var elList = document.querySelectorAll(attrSelector);
    for (var i=elList.length - 1; i >= 0; i--) initialize(elList[i]);
    
    // TODO: listen for new elements
    util.onNodeInserted(function(el) {
      if (el.getAttribute(attrKey) === 'tab') initialize(el);
    });
  },
  
  /** External API */
  api: {
    activate: function(paneId) {
      var cssSelector = '[' + controlsAttrKey + '=' + paneId + ']',
          toggleEl = document.querySelectorAll(cssSelector);

      if (!toggleEl.length) {
        util.raiseError('Tab control for pane "' + paneId + '" not found');
      }

      activateTab(toggleEl[0]);
    }
  }
};
