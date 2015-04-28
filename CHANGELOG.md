# MUI Changelog

## 0.0.9 - April 27, 2015

* Added accent color buttons

## 0.0.8 - April 11, 2015

* Fixed reversed values of $mui-accent-color-dark and $mui-accent-color-light
* Changed MUI SASS variable names with "-background" to "-bg"

## 0.0.7 - April 11, 2015

* Updated npm dependencies
* Added touchstart listener for ripple effect

## 0.0.6 - March 23, 2015

* Set z-index of mui-dropdown-menu to 1
* Changed data attribute name of dropdown to "data-mui-toggle"
* Added tabs to CSS/JS
* Added support for overlay options and childElement
* Added jsdoc documentation to javascript modules
* Removed vertical-align from mui-table
* Added !important to mui-align helpers

## 0.0.5 - March 7, 2015

* Added .mui-dropdown-menu-right to support right-aligned dropdowns
* Improved handling of dropdowns by triggering on toggle button instead of wrapper
* Added .mui-align-[baseline|top|middle|bottom] helper classes

## 0.0.4 - March 7, 2015

* Fixed bug in webcomponents/buttons.js that was causing syntax error
* Fixed bug in webcomponents/forms.js that was causing an undefined function error
* Added dist/ to repository to better support 3rd party frameworks

## 0.0.3 - February 26, 2015

* Removed configurable prfx in favor of explicit 'mui-'
* Prepended 'mui-' to SASS variable names

## 0.0.2 - February 25, 2015

* Fixed issue with ripples and dropdowns not triggering due to clicks on button child elements
* Using CSS animation listeners to detect node insertions
* Centralized animationstart listener in js/lib/util.js
