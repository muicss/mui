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
    activeClass = 'mui-is-active',
    showstartKey = 'mui.tabs.showstart',
    showendKey = 'mui.tabs.showend',
    hidestartKey = 'mui.tabs.hidestart',
    hideendKey = 'mui.tabs.hideend';


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

  activateTab(toggleEl);
}


/**
 * Activate the tab controlled by the toggle element.
 * @param {Element} toggleEl - The toggle element.
 */
function activateTab(toggleEl) {
  var currTabEl = toggleEl.parentNode,
      currPaneId = toggleEl.getAttribute(controlsAttrKey),
      currPaneEl = document.getElementById(currPaneId),
      prevTabEl,
      prevPaneEl,
      currData,
      prevData,
      ev1,
      ev2;

  // raise error if pane doesn't exist
  if (!currPaneEl) util.raiseError('Tab pane "' + currPaneId + '" not found');

  // get previous tab & pane
  prevTabEl = getActiveSibling(currTabEl);
  prevPaneEl = getActiveSibling(currPaneEl);
  
  // define event data
  currData = {relatedTarget: prevTabEl};
  prevData = {relatedTarget: currTabEl};

  // dispatch 'hidestart', 'showstart' events
  ev1 = util.dispatchEvent(prevTabEl, hidestartKey, true, true, prevData);
  ev2 = util.dispatchEvent(currTabEl, showstartKey, true, true, currData);

  // let events bubble
  setTimeout(function() {
    // exit if either event was canceled
    if (ev1.defaultPrevented || ev2.defaultPrevented) return;

    // de-activate previous
    if (prevTabEl) jqLite.removeClass(prevTabEl, activeClass);
    if (prevPaneEl) jqLite.removeClass(prevPaneEl, activeClass);

    // activate current
    jqLite.addClass(currTabEl, activeClass);
    jqLite.addClass(currPaneEl, activeClass);

    // dispatch 'hideend', 'showend' events
    util.dispatchEvent(prevTabEl, hideendKey, true, false, prevData);
    util.dispatchEvent(currTabEl, showendKey, true, false, currData);
  }, 0);
}


/** 
 * Get previous active sibling.
 * @param {Element} el - The anchor element.
 */
function getActiveSibling(el) {
  var elList = el.parentNode.children,
      q = elList.length,
      activeEl = null,
      tmpEl;

  while (q-- && !activeEl) {
    tmpEl = elList[q];
    if (tmpEl !== el && jqLite.hasClass(tmpEl, activeClass)) activeEl = tmpEl
  }

  return activeEl;
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
