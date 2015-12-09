/**
 * MUI React select module
 * @module react/forms/select
 */

'use strict';

var jqLite = require('../../js/lib/jqlite.js'),
    util = require('../../js/lib/util.js'),
    PropTypes = React.PropTypes;


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
  componentDidMount: function() {
    // make wrapper element focusable
    this.refs.wrapperEl.tabIndex = -1;
  },
  render: function() {
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
          onMousedown={ this.onMousedown }
          onClick={ this.onClick }
          onFocus={ this.onFocus }
        >
          { this.props.children }
        </select>
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

    var doc = document,
        selectEl = this.refs.selectEl,
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

    var doc = document,
        el = doc.createElement('div');

    doc.body.appendChild(el);
    ReactDOM.render(<Menu selectInst={ this } />, el);
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
  propTypes: {
    selectInst: PropTypes.element
  },
  getDefaultProps: function() {
    return {
      selectInst: null
    };
  },
  render: function() {
    var optionEl, itemEl, i;

    var menuItems = [],
        optionList = this.props.selectInst.refs.selectEl.children,
        m = optionList.length,
        selectedPos = 0;

    // define menu items
    for (i=0; i < m; i++) {
      optionEl = optionList[i];
      
      itemEl = document.createElement('div');
      itemEl.textContent = optionEl.textContent;
      itemEl._muiPos = i;

      if (optionEl.selected) selectedPos = i;

      menuItems.push(itemEl);
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
