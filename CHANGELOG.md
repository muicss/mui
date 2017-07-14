# MUI Changelog

## 0.9.18 - July 13, 2017

* Added ng-checked support to MUI Angular Checkbox and Radio components

## 0.9.17 - June 14, 2017

* Upgraded devDependencies
* Upgraded to React 15.6.0

## 0.9.16 - April 26, 2017

* Added support for `required` property to MUI React Select component

## 0.9.15 - April 10, 2017

* Upgraded to React 15.5.0

## 0.9.14 - April, 8 2017

* Fixed issue with CSS/JS DOM insertion CSS causing animation flash on disabled
  elements
* Added top/left borders to dropdown component menu on IE
* Deferred creation of ripple effect container element to mousedown event in
  CSS/JS library

## 0.9.13 - April, 3 2017

* Fixed issue in Chrome where textfield floating labels were ignoring autofill events in CSS/JS library

## 0.9.12 - March 18, 2017

* Added support for jump-to alphabetical matches to CSS/JS, Angular and React
  Select components

## 0.9.11 - March 17, 2017

* Fixed CSS animation trigger bug in IE Edge

## 0.9.10 - March 11, 2017

* Upgraded devDependencies
* Updated React TextField component to allow object or string labels

## 0.9.9 - February 15, 2017

* Bumped version number

## 0.9.9-rc2 - January 22, 2017

* Added more fine-grained CSS state classes to input and textfield controls
  * `.mui--is-untouched` - Control instance has not lost focus
  * `.mui--is-touched` - Control instance has lost focus
  * `.mui--is-pristine` - User has not interacted with control instance
  * `.mui--is-dirty` - User has interacted with control instance
  * `.mui--is-empty` - Control instance is empty
  * `.mui--is-not-empty` - Control instance is not empty
* Skipping replacement of `untouched`/`touched` CSS states on window blur event
* Removed hard coded anchor tag :hover color

## 0.9.9-rc1 - January 16, 2017

* Minimized global CSS footprint (mui.css)
  * Includes Normalize.css
  * Sets font styles for `<html>`, `<body>` tags
  * Sets style for naked `<a>` tags
  * Sets style for `<p>`, `<ul>`, `<ol>`, `<strong>`, `<abbr>`, `<hr>`, `<h1>`,
    `<h2>`, etc.
  * No longer sets `box-sizing: border-box` CSS property globally
  * No longer modifies styles for `<figure>`, `<img>`, `<legend>`,
    `<input type="search">`, `<input type="file">`, `<input type="radio">`,
    `<input type="checkbox">`
* Added version without globals (mui-noglobals.css)
  * No global CSS properties
* Bugfix for IE Edge box shadows
* Added `mui-form` class to scope `<legend>` and `<fieldset>` tags

## 0.9.8 - January 12, 2017

* Reverted to body method for scroll lock
* Fixed bug causing issues with validation of required input fields when MUI
  JS is loaded asynchronously

## 0.9.7 - December 20, 2016

* Fixed static/dynamic content bug in React Tabs component
* Added support for controlled tabs in React Tabs component
* Changed `initialSelectedIndex` to `defaultSelectedIndex` in React Tabs
  component

## 0.9.6 - December 3, 2016

* Fixed bug in React Select component that added `name` property to outer
  `<div>` element wrather than inner `<select>` element
* Improved ripple code, fixed bug in opera
* Made CSS/JS Select component more robust against memory leaks

## 0.9.5 - November 26, 2016

* Added '!default` modifier to value of $mui-base-font-smoothing in SASS
* Implemented MDL ripple technique to fix animation flash issue
  https://github.com/muicss/mui/issues/169
* Decreased box-shadow effect when button is activated

## 0.9.4 - November 9, 2016

* Fixed issue with single tab elements in React Tabs component
* Improved handling of MUI animationstart callbacks - using useCapture to
  capture event and calling ev.stopImmediatePropagation() to prevent other
  listeners from firing
* Fixed bug preventing ripple effect on dynamically added dropdown button
  elements in CSS/JS library
* Removed flicker on animationstart helpers css load
* upgraded devDependencies

## 0.9.3 - October 21, 2016

* Fixed styling issue in CSS/JS Dropdown component when using non-INPUT/BUTTON
  toggle elements

## 0.9.2 - October 20, 2016

* Fixed issue with reference to `document` in React Select component causing
  problems with server-side rendering
* Added missing `xl` breakpoint to Angular library
* Introduced use of documentFragment in CSS/JS Select component to improve
  performance
* Upgraded Normalize.css to 5.0.0

## 0.9.1 - October 6, 2016

* Moved node-inserted CSS classes to JavaScript library
* Fixed issue with integer 0 values in React Input/Textarea components
* Added support for visible scroll bars to overlay method

## 0.9.0 - October 2, 2016

* Refactored CSS/JS, React, Angular Select components
* Using more robust, wrapper-based method for wrapping built-in `<select>` elements
* Fixed bug in jqLite.one() method preventing detaching method with useCapture
* Added minified files to packages/cdn/extra

## 0.8.1 - September 20, 2016

* Added support for disabled options to MUI CSS/JS Select component
* Modified Select components to use browser built-in menu for touchscreen
  devices

## 0.8.0 - September 15, 2016

* Added RTL support to CSS
* Added CDN package to NPM package

## 0.7.5 - September 8, 2016

* Added gulp watch task for development
* Improved handling of focused elements when overlay method is activated
* Added up/down scroll to overlay by setting focus to overlay element
* Fixed issue with MUI Angular button attributes (e.g. `type`)

## 0.7.4 - September 2, 2016

* Added support for Optgroups to CSS/JS Select component

## 0.7.3 - August 25, 2016

* Added support for custom className to React Option component

## 0.7.2 - August 24, 2016

* Fixed bug causing React Select component to ignore value change on item
  click in dropdown menu
* Removed reset scroll position from overlay teardown

## 0.7.1 - August 21, 2016

* Fixed bug causing React Input and Textarea components with defaultValue to
  unfloat labels on state update

## 0.7.0 - August 17, 2016

* Fixed bug preventing execution of onFocus callback in React Input and
  Textarea components

## 0.6.9 - August 11, 2016

* Fixed empty/not-empty CSS bug with React Input and Textarea components

## 0.6.8 - July 12, 2016

* Changed class name of background color helpers
* Added danger color to background color helpers

## 0.6.7 - July 12, 2016

* Added background color helpers

## 0.6.6 - July 10, 2016

* Improved handling of spread attributes in MUI React library to prevent
  unknown property warnings in React 15.2.1
* Fixed bug in React Button component that was ignoring mouse/touch event
  callbacks (onMouseDown, onMouseUp, onMouseLeave, onTouchStart, onTouchEnd)

## 0.6.5 - June 26, 2016

* Fixed bug in React dropdown component causing issues with server-side
  rendering

## 0.6.4 - June 25, 2016

* Removed reference to document in MUI React button module causing issues with
  server-side rendering

## 0.6.3 - June 22, 2016

* Improved handling of ripple dimensions to deal with long buttons

## 0.6.2 - June 22, 2016

* Fixed bug causing recursive call to requestAnimationFrame

## 0.6.1 - June 22, 2016

* Fixed slow animation issue with ripple effect in Firefox on linux
* Improved ripple effect animation

## 0.6.0 - May 22, 2016

* Added support for select box label to MUI CSS/JS, MUI React and MUI Angular

## 0.5.9 - May 17, 2016

* Set z-index of .mui-select__menu to 2 to fix overlap bug with floating action
  buttons

## 0.5.8 - May 6, 2016

* Added react@^15.0.0 as peerDependency in NPM package.json

## 0.5.7 - May 5, 2016

* Fixed Angular injector minification bug in MUI Tabs

## 0.5.6 - April 28, 2016

* Bugfix to Email SASS semantic markup
* Handling timeouts gracefully in React componentWillUnmount

## 0.5.5 - April 26, 2016

* Using ES6 for Angular source code
* Added MUI Angular to NPM package

## 0.5.4 - April 22, 2016

* Added support for `target` attribute to React DropdownItem

## 0.5.3 - April 16, 2016

* Added support for Angular Tabs directive
* Fixed focus bug with Angular Select directive

## 0.5.2 - April 14, 2016

* Added support for React 15.0.1

## 0.5.1 - April 12, 2016

* Fixed bug causing onChange to be called twice on React <Checkbox> and <Radio>

## 0.5.0 - April 7, 2016

* Major upgrade to Angular library - fixed many bugs and added missing features

## 0.4.9 - April 6, 2016

* Fixed bug in React Dropdown that prevented menu from closing when a
  DropdownItem was selected
* Fixed bug in React Dropdown that fired onClick event on DropdownItem twice
* Added support for onSelect event to React Dropdown
* Added support for React elements to React Dropdown label

## 0.4.8 - March 30, 2016

* Fixed bug that kept dropdowns open when other dropdowns were clicked on

## 0.4.7 - March 1, 2016

* Added JS `change` eveent handler to mui-textfield input elements
* Improved organization of MUI sass files
* Improved organization of MUI js files

## 0.4.6 - February 18, 2016

* Fixed component name errors in NPM react.js module

## 0.4.5 - February 12, 2016

* Changed React SelectItem component name to Option
* Added controlled controller support to React Select, Checkbox, Radio
* Bugfixes to Angular library

## 0.4.4 - February 8, 2016

* Changed React input component names to Input and Textarea

## 0.4.3 - February 7, 2016

* Added Angular library

## 0.4.2 - February 3, 2016

* Added support for other React attributes and events
* Set default font-family to "Arial, Verdana, Tahoma" for better cross-browser
  support out of the box

## 0.4.1 - February 2, 2016

* Added defaultValue and controlled component support to React TextInput and
  TextareaInput

## 0.4.0 - February 2, 2016

* Made CSS/JS ripple node removal more robust
* Added value, defaultValue, onChange support to React Select component
* Changed boolean properties to use React built-in names:
  * isAutofocus -> autoFocus
  * isChecked -> checked
  * isDisabled -> disabled
  * isRequired -> required
* Changed other boolean properties to use React-like names:
  * isFluid -> fluid
  * isInline -> inline
  * isInvalid -> invalid
  * isJustified -> justified
  * isLabelFloating -> floatingLabel
* Added support for defaultChecked to React Checkbox and Radio components

## 0.3.0

* Replaced .mui-textfield--invalid with .mui--is-invalid
* Replaced .mui--text-black-{XX}, .mui--text-white-{XX} color helpers with:
  * .mui--text-dark
  * .mui--text-dark-secondary
  * .mui--text-dark-hint
  * .mui--text-light
  * .mui--text-light-secondary
  * .mui--text-light-hint
  * .mui--text-accent
  * .mui--text-accent-secondary
  * .mui--text-accent-hint
* Major non-backwards compatible modifications to React library
* Added .mui--text-black and .mui--text-white
* Added 'xl' screen size and changed default widths for 'sm', 'md' and 'lg' breakpoints

## 0.2.10 - January 12, 2016

* Fixed bug causing mui.overlay('off') to throw error when called before
  turning on overlay

## 0.2.9 - December 7, 2015

* Fixed path to js file for `muicss` npm package

## 0.2.8 - December 3, 2015

* Added .mui-textfield--invalid css helper

## 0.2.7 - December 1, 2015

* Replaced .mui--text-black-26 with .mui--text-black-38 to bring CSS color
  helpers in line with MD spec

## 0.2.6 - November 27, 2015

* Improves floating label animation by using CSS transform

## 0.2.5 - November 27, 2015

* Added .mui-body--scroll-lock specifically for scroll lock

## 0.2.4 - November 26, 2015

* Uses body class for scroll lock

## 0.2.3 - November 21, 2015

* Upgraded to React 0.14.3

## 0.2.2 - November 20, 2015

* Improved IE10+ CSS borders for buttons, panels and select menu
* Improved positioning of select menu
* Improved logic of select menu initial scroll position
* Improved window scroll lock

## 0.2.1 - October 16, 2015

* Moved textfield floating label modifier to wrapper class
* Disabled use of .mui-textfield__input and .mui-textfield__label--floating

## 0.2.0 - October 12, 2015

* Added html email example layout

## 0.2.0-rc3 - October 10, 2015

* Changed .mui--notransition to .mui--no-transition
* Added .mui--no-user-select

## 0.2.0-rc2 - October 8, 2015

* Removed color attribute from typography classes
* Added text color helpers
* Migrated colors.css to BEM syntax

## 0.2.0-rc1 - October 7, 2015

* Migrated CSS/JS and Email Libraries to BEM syntax
* Removed internal bootstrap source code dependency
* Removed MUIRoundButton from React library

## 0.1.23 - September 19, 2015

* Added support for data-attributes in Tabs CSS

## 0.1.22 - September 18, 2015

* Added tab events

## 0.1.22-rc1 - September 3, 2015

* Removed unnecessary styles from button CSS
* Using "mui-is-" syntax for stateful CSS (e.g. mui-is-active)
* Added data-attributes syntax for buttons, dropdowns, tables, container
* Added a dark button option
* Changed floating action button naming from "floating" to "fab"

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
