'use strict';

var jqLite = require('./lib/jqLite.js'),
    util = require('./lib/util.js'),
    attrSelector = '[data-mui-toggle="tab"]',
    controlsAttrKey = 'data-mui-controls',
    activeClass = 'mui-active',
    scrollableClass = 'mui-tabs-scrollable';


/**
 * Initialize the toggle element
 * @param {HTMLElement} toggleEl - The toggle element.
 */
function initialize(toggleEl) {
  // check flag
  if (toggleEl._muiTabs === true) return;
  else toggleEl._muiTabs = true;

  // attach click handler
  jqLite.on(toggleEl, 'click', clickHandler);

  // check for scrollable wrapper element
  var wrapperEl = toggleEl.parentNode.parentNode.parentNode;
  if (jqLite.hasClass(wrapperEl, scrollableClass)) {
    initializeScrollable(wrapperEl, toggleEl.parentNode.parentNode);
  }
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
 * @param {HTMLElement} toggleEl - The toggle element.
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


/**
 * Initialize scrollable tabs
 * @param {HTMLElement} wrapperEl - The scrollable tabs wrapper element.
 * @param {HTMLElement} tabsEl - The tabs container element.
 */
function initializeScrollable(wrapperEl, tabsEl) {
  // check flag
  if (wrapperEl._muiTabs === true) return;
  else wrapperEl._muiTabs = true;


  // add scroll elements
  var scrollLeftEl = document.createElement('div');
  scrollLeftEl.className = 'mui-tabs-leftscroll';
  wrapperEl.appendChild(scrollLeftEl);
  
  var scrollRightEl = document.createElement('div');
  scrollRightEl.className = 'mui-tabs-rightscroll';
  wrapperEl.appendChild(scrollRightEl);
  
  
  // window resize event handler
  var lastOverflow = false;
  
  function onResize() {
    var currOverflow = (tabsEl.scrollWidth > tabsEl.clientWidth);

    // check last value
    if (currOverflow !== lastOverflow) onOverflowChange(currOverflow);

    lastOverflow = currOverflow;
  }

  
  // overflow change event handler
  function onOverflowChange(status) {
    if (status === false) {
      jqLite.css(scrollLeftEl, 'display', 'none');
      jqLite.css(scrollRightEl, 'display', 'none');
    } else {
      jqLite.css(scrollLeftEl, 'display', 'block');
      jqLite.css(scrollRightEl, 'display', 'block');
    }
  }

  
  jqLite.on(window, 'resize', onResize);
  onResize();
}

 
/**
 * Define module API.
 */
module.exports = {
  initListeners: function() {
    // markup elements available when method is called
    var elList = document.querySelectorAll(attrSelector);
    for (var i=elList.length - 1; i >= 0; i--) initialize(elList[i]);

    // TODO: listen for new elements
    util.onNodeInserted(function(el) {
      if (el.getAttribute(attrSelector) !== null) initialize(el);
    });
  }
};
