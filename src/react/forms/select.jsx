/**
 * MUI React select module
 * @module react/forms/select
 */

'use strict';

var jqLite = require('../../js/lib/jqlite.js'),
    util = require('../../js/lib/util.js'),
    PropTypes = React.PropTypes,
    wrapperPadding = 15,  // from CSS
    inputHeight = 32,  // from CSS
    optionHeight = 42,  // from CSS
    menuPadding = 8,  // from CSS
    doc = document,
    win = window;


/**
 * Select constructor
 * @class
 */
var Select = React.createClass({
  propTypes: {
    name: PropTypes.string,
    isAutofocus: PropTypes.bool,
    isDisabled: PropTypes.bool,
    isMultiple: PropTypes.bool,
    isRequired: PropTypes.bool,
    useDefault: PropTypes.bool,
    onChange: PropTypes.func
  },
  getDefaultProps: function() {
    return {
      name: null,
      isAutofocus: false,
      isDisabled: false,
      isMultiple: false,
      isRequired: false,
      useDefault: false,
      onChange: null
    };
  },
  getInitialState: function() {
    return {
      showMenu: false
    };
  },
  componentDidMount: function() {
    // make wrapper element focusable
    this.refs.wrapperEl.tabIndex = -1;
  },
  render: function() {
    var menuElem;

    if (this.state.showMenu) {
      menuElem = (
        <Menu
          selectEl={ this.refs.selectEl }
          wrapperEl={ this.refs.wrapperEl }
        />
      );
    }

    return (
      <div
        ref="wrapperEl"
        className="mui-select"
        onFocus={ this.onWrapperFocus }
      >
        <select
          ref="selectEl"
          name={ this.props.name }
          autofocus={ this.props.isAutofocus }
          disabled={ this.props.isDisabled }
          multiple={ this.props.isMultiple }
          required={ this.props.isRequired }
          onMouseDown={ this.onMousedown }
          onClick={ this.onClick }
          onFocus={ this.onFocus }
        >
          { this.props.children }
        </select>
        { menuElem }
      </div>
    );
  },

  /**
   * Disable default select menu on mousedown
   * @param {Event} ev - The DOM Event
   */
  onMousedown: function(ev) {
    if (ev.button !== 0 || this.props.useDefault === true) return;
    ev.preventDefault();
  },

  /**
   * Handle click events on select element.
   * @param {Event} ev - The DOM event
   */
  onClick: function(ev) {
    if (ev.button !== 0) return;  // only left clicks
    this.renderMenu();
  },

  /**
   * Handle focus event on select element.
   */
  onFocus: function(ev) {
    console.log('onFocus');
    console.log(ev.target);

    // check flag
    if (this.props.useDefault === true) return;

    var selectEl = this.refs.selectEl,
        wrapperEl = this.refs.wrapperEl,
        origIndex = selectEl.tabIndex,
        keydownFn = util.callback(this, 'onKeydown');

    // attach keydown handler
    jqLite.on(doc, 'keydown', keydownFn);

    // disable tabfocus once
    //selectEl.tabIndex = -1;
    jqLite.one(wrapperEl, 'blur', function() {
      //selectEl.tabIndex = origIndex;
      jqLite.off(doc, 'keydown', keydownFn);
    });

    // defer focus to wrapper
    //wrapperEl.focus();
  },

  /**
   * Handle keydown events on document.
   */
  onKeydown: function(ev) {
    console.log('keydown');

    // spacebar, down, up
    if (ev.keyCode === 32 || ev.keyCode === 38 || ev.keyCode === 40) {
      // prevent win scroll
      ev.preventDefault();

      if (this.refs.selectEl.disabled !== true) this.renderMenu();
    }
  },

  /**
   * Handle focus event on wrapper element.
   */
  onWrapperFocus: function() {
    console.log('onWrapperFocus');

    // firefox bugfix
    if (this.refs.selectEl.disabled) return this.refs.wrapperEl.blur();
  },

  /**
   * Render custom select menu.
   */
  renderMenu: function() {
    console.log('render menu');
    this.setState({showMenu: true});
  }
});


/**
 * SelectItem constructor
 * @class
 */
var SelectItem = React.createClass({
  propTypes: {
    value: PropTypes.string,
    label: PropTypes.string
  },
  getDefaultProps: function() {
    return {
      value: null,
      label: null
    };
  },
  render: function() {
    return (
      <option value={ this.props.value }>
        { this.props.label }
      </option>
    );
  }
});


/**
 * Menu constructor
 * @class
 */
var Menu = React.createClass({
  getDefaultProps: function() {
    return {
      selectEl: null,
      wrapperEl: null
    };
  },
  getInitialState: function() {
    return {
      selectedPos: 0
    };
  },
  componentWillMount: function() {
    var optionList = this.props.selectEl.children,
        m = optionList.length,
        selectedPos = i,
        i;

    // get current selected position
    for (i=m - 1; i > -1; i--) if (optionList[i].selected) selectedPos = i;
    this.setState({selectedPos: selectedPos});

    // blur active element (IE10 bugfix)
    setTimeout(function() {
      if (doc.activeElement.nodeName.toLowerCase() !== "body") {
        doc.activeElement.blur();
      }
    }, 0);
  },
  componentDidMount: function() {
    var initTop, minTop, maxTop, top;

    var menuEl = ReactDOM.findDOMNode(this),
        viewHeight = doc.documentElement.clientHeight,
        m = this.props.selectEl.children.length;

    // set height (use viewport height as maximum)
    var height = m * optionHeight + 2 * menuPadding,
        isOverflow = height > viewHeight;

    height = Math.min(height, viewHeight);
    jqLite.css(menuEl, 'height', height + 'px');

    // ideal position
    initTop = (menuPadding + optionHeight) - (wrapperPadding + inputHeight);
    initTop -= this.state.selectedPos * optionHeight;

    // minimum position
    minTop = -1 * this.props.wrapperEl.getBoundingClientRect().top;

    // maximum position
    maxTop = (viewHeight - height) + minTop;

    // prevent overflowy-y
    top = Math.max(initTop, minTop);
    top = Math.min(top, maxTop);

    jqLite.css(menuEl, 'top', top + 'px');
    
    // set menu scroll position
    if (isOverflow) {
      var scrollIdeal, scrollMax;

      scrollIdeal = (menuPadding + (selectedPos + 1) * optionHeight) -
        (-1 * top + wrapperPadding + inputHeight);
      
      scrollMax = m * optionHeight + 2 * menuPadding - height;
      
      jqLite.scrollTop(menuEl, Math.min(scrollIdeal, scrollMax) + 'px');
    }
  },
  render: function() {
    var menuItems = [],
        optionList = this.props.selectEl.children,
        m = optionList.length,
        i;

    // define menu items
    for (i=0; i < m; i++) {
      menuItems.push(<div key={ i }>{ optionList[i].textContent }</div>);
    }

    return (
      <div className="mui-select__menu">
        { menuItems }  
      </div>
    );
  }
});


/** Define module API */
module.exports = {
  Select: Select,
  SelectItem: SelectItem
};
