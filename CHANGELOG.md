# MUI Changelog

## 0.1.21 - August 5, 2015

* Removed default down arrow on select component on IE

## 0.1.20 - August 5, 2015

* Raising Error objects
* Decreased $mui-container-sm width by 18px to account for vertical scrollbar
* Bugfix to _outsideClick handler in react library
* Using default &lt;select&gt; behavior on touch devices

## 0.1.19 - July 26, 2015

* Bugfix to mui-react-combined.js build script
* Removed styles on bare <label> element
* Removed styles on bare <fieldset> element
* Removed styles on bare input[type="radio"], input[type="checkbox"],
  input[type="range"], select[multiple], select[size]
* Renamed $mui-panel-bg to $mui-panel-bg-color
* Changed btn-raised box-shadow to 0 2px 2px rgba(0, 0, 0, 0.20)

## 0.1.18 - July 6, 2015

* Disabled font-smoothing by default
* Set all button font weights to 500

## 0.1.17 - July 5, 2015

* Bugfix to add font-smoothing to inputs, textareas and buttons on Safari

## 0.1.16 - July 5, 2015

* Removed on-load underline from required fields
* Removed '*' from required field labels
* Removed top/bottom margin from form-inline buttons
* Improved raised button box shadow
* Added text font-smoothing to body by default
* Removed custom letter-spacing
* Set button font-weight to 500, 600 for white text
* Moved mui-colors.css to extra/ directory in dist/
* Added mui-combined.js to extra/
* Added mui-react-combined.js to extra/
* Set maximum height of select element menu to viewport height

## 0.1.15 - June 28, 2015

* Removed ignore 'dist' directory from bower.json

## 0.1.14 - June 27, 2015

* Added support for label wrapping to mui-form-group via data-attribute

## 0.1.13 - June 14, 2015

* Added .mui-dirty class to .mui-form-control elements on focus

## 0.1.12 - June 13, 2015

* Added secret mui.tabs.activate() method

## 0.1.11 - June 11, 2015

* Bugfix to js/tabs.js in DOM node listener

## 0.1.10 - June 11, 2015

* Re-built dist to fix css issue

## 0.1.9 - June 10, 2015

* Fixed bug in dropdown to close menu on item select

## 0.1.8 - June 3, 2015

* Added compiled files to release

## 0.1.7 - June 3, 2015

* Fixed typo in React dropdown componentWillUnmount()

## 0.1.6 - May 31, 2015

* Changed style of empty required fields

## 0.1.5 - May 31, 2015

* Added form validator handlers
* Implemented form-control handler to set mui-empty classes
* Migrated floating labels to use mui-empty classes
* Added 'change' event dispatching to select component

## 0.1.4 - May 28, 2015

* Added mui-select component to CSS/JS
* Split forms.js into two libraries in source code

## 0.1.3 - May 23, 2015

* Using un-minified files for meteor distribution

## 0.1.2 - May 14, 2015

* Fixed bug to prevent form submission on dropdown click
* Fixed bug in forms.js missing function

## 0.1.1 - May 10, 2015

* Removed bower dependencies
* Copied bootstrap source into repo

## 0.1.0 - May 9, 2015

* Improved React forms
* Added React buttons, dropdowns, tabs

## 0.0.11 - May 6, 2015

* Improved mui-btn box-shadow rules
* Removed outline from mui-btn on focus
* Improved CSS depth helper box-shadow rules

## 0.0.10 - May 1, 2015

* Added .mui-appbar-top helper
* Added onclose callback option to overlay

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
