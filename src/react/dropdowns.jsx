/**
 * MUI React dropdowns module
 * @module react/dropdowns
 */
/* jshint quotmark:false */
// jscs:disable validateQuoteMarks

'use strict';

var util = require('../js/lib/util'),
    jqLite = require('../js/lib/jqLite'),
    buttons = require('./buttons.jsx'),
    Button = buttons.Button,
    RoundButton = buttons.RoundButton;

var dropdownClass = 'mui-dropdown',
    caretClass = 'mui-caret',
    menuClass = 'mui-dropdown-menu',
    openClass = 'mui-open',
    rightClass = 'mui-dropdown-menu-right';


/**
 * Dropdown constructor
 * @class
 */
var Dropdown = React.createClass({
  menuStyle: { top: 0 },
  getInitialState: function() {
    return {
      opened: false
    };
  },
  componentWillMount: function() {
    document.addEventListener('click', this._outsideClick);
  },
  componentWillUnmount: function() {
    document.removeEventListener('click', this._outsideClick);
  },
  render: function() {
    var button;

    if (this.props.round) {
      button = (
        <RoundButton
          ref="button"
          onClick={ this._click }
          mini={ this.props.mini }
          disabled={ this.props.disabled }
        >
          { this.props.label }
          <span className={ caretClass } />
        </RoundButton>
      );
    } else {
      button = (
        <Button
          ref="button"
          onClick={ this._click }
          type={ this.props.type }
          flat={ this.props.flat }
          raised={ this.props.raised }
          large={ this.props.large }
          disabled={ this.props.disabled }
        >
          { this.props.label }
          <span className={ caretClass } />
        </Button>
      );
    }

    var cs = {};

    cs[menuClass] = true;
    cs[openClass] = this.state.opened;
    cs[rightClass] = this.props.right;
    cs = util.classNames(cs);

    return (
      <div className={ dropdownClass } style={ {padding: '0px 2px 0px'} } >
        { button }
        { this.state.opened && (
            <ul
              className={ cs }
              style={ this.menuStyle }
              ref="menu"
              onClick={ this._select }
            >
              { this.props.children }
            </ul>)
        }
      </div>
    );
  },
  _click: function(ev) {
    // only left clicks
    if (ev.button !== 0) return;

    // exit if toggle button is disabled
    if (this.props.disabled) return;

    setTimeout(function() {
      if (!ev.defaultPrevented) this._toggle();
    }.bind(this), 0);
  },
  _toggle: function() {
    // exit if no menu element
    if (!this.props.children) {
      return util.raiseError('Dropdown menu element not found');
    }

    if (this.state.opened) this._close();
    else this._open();
  },
  _open: function() {
    // position menu element below toggle button
    var wrapperRect = React.findDOMNode(this).getBoundingClientRect(),
        toggleRect;

    toggleRect = React.findDOMNode(this.refs.button).getBoundingClientRect();
    this.menuStyle.top = toggleRect.top - wrapperRect.top + toggleRect.height;

    this.setState({
      opened: true
    });
  },
  _close: function() {
    this.setState({
      opened: false
    });
  },
  _select: function(ev) {
    if (this.props.onClick) this.props.onClick(this, ev);
  },
  _outsideClick: function(ev) {
    var isClickInside = React.findDOMNode(this).contains(ev.target);

    if (!isClickInside) {
      this._close();
    }
  }
});


/**
 * DropdownItem constructor
 * @class
 */
var DropdownItem = React.createClass({
  render: function() {
    return (
      <li>
        <a href={ this.props.link || '#' } onClick={ this._click }>
          { this.props.children }
        </a>
      </li>
    );
  },
  _click: function(ev) {
    if (this.props.onClick) this.props.onClick(this, ev);
  }
});


/** Define module API */
module.exports = {
  Dropdown: Dropdown,
  DropdownItem: DropdownItem
};
