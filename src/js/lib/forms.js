/**
 * MUI CSS/JS form helpers module
 * @module lib/forms.py
 */

'use strict';

var wrapperPadding = 15,  // from CSS
    inputHeight = 32,  // from CSS
    optionHeight = 42,  // from CSS
    menuPadding = 8;  // from CSS


/**
 * Menu position/size/scroll helper
 * @returns {Object} Object with keys 'height', 'top', 'scrollTop'
 */
function getMenuPositionalCSSFn(wrapperEl, numOptions, currentIndex) {
  var viewHeight = document.documentElement.clientHeight;

  // determine 'height'
  var h = numOptions * optionHeight + 2 * menuPadding,
      height = Math.min(h, viewHeight);

  // determine 'top'
  var top, initTop, minTop, maxTop;

  initTop = (menuPadding + optionHeight) - (wrapperPadding + inputHeight);
  initTop -= currentIndex * optionHeight;

  minTop = -1 * wrapperEl.getBoundingClientRect().top;
  maxTop = (viewHeight - height) + minTop;

  top = Math.min(Math.max(initTop, minTop), maxTop);

  // determine 'scrollTop'
  var scrollTop = 0,
      scrollIdeal,
      scrollMax;

  if (h > viewHeight) {
    scrollIdeal = (menuPadding + (currentIndex + 1) * optionHeight) -
      (-1 * top + wrapperPadding + inputHeight);
    scrollMax = numOptions * optionHeight + 2 * menuPadding - height;
    scrollTop = Math.min(scrollIdeal, scrollMax);
  }

  return {
    'height': height + 'px',
    'top': top + 'px',
    'scrollTop': scrollTop
  };
}


/** Define module API */
module.exports = {
  getMenuPositionalCSS: getMenuPositionalCSSFn
};
