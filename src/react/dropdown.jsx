/**
 * MUI React dropdowns module
 * @module react/dropdowns
 */
/* jshint quotmark:false */
// jscs:disable validateQuoteMarks

'use strict';

var util = require('../js/lib/util'),
    jqLite = require('../js/lib/jqLite'),
    Button = require('./button.jsx').Button,
    Caret = require('./caret.jsx').Caret,
    PropTypes = React.PropTypes;

var dropdownClass = 'mui-dropdown',
    menuClass = 'mui-dropdown__menu',
    openClass = 'mui--is-open',
    rightClass = 'mui-dropdown__menu--right';


/**
 * Dropdown constructor
 * @class
 */
var Dropdown = React.createClass({
  propTypes: {
    color: Button.propTypes.color,
    variant: Button.propTypes.variant,
    size: Button.propTypes.size,
    label: PropTypes.string,
    alignMenu: PropTypes.oneOf(['left', 'right']),
    onClick: PropTypes.func,
    isDisabled: PropTypes.bool
  },
  getDefaultProps: function() {
    return {
      color: 'default',
      variant: 'default',
      size: 'default',
      label: '',
      alignMenu: 'left',
      onClick: null,
      isDisabled: false
    };
  },
  getInitialState: function() {
    return {
      opened: false,
      menuTop: 0
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

    button = (
        <Button
          ref="button"
          onClick={ this._click }
          color={ this.props.color }
          variant={ this.props.variant }
          size={ this.props.size }
          isDisabled={ this.props.isDisabled }
        >
          { this.props.label }
          <Caret />
        </Button>
    );

    var cs = {};

    cs[menuClass] = true;
    cs[openClass] = this.state.opened;
    cs[rightClass] = (this.props.alignMenu === 'right');
    cs = util.classNames(cs);

    return (
      <div className={ dropdownClass }>
        { button }
        { this.state.opened && (
            <ul
              className={ cs }
              style={ {top: this.state.menuTop } }
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
    if (this.props.isDisabled) return;

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
    var wrapperRect = ReactDOM.findDOMNode(this).getBoundingClientRect(),
        toggleRect;

    toggleRect = ReactDOM.findDOMNode(this.refs.button).getBoundingClientRect();

    this.setState({
      opened: true,
      menuTop: toggleRect.top - wrapperRect.top + toggleRect.height
    });
  },
  _close: function() {
    this.setState({opened: false});
  },
  _select: function(ev) {
    if (this.props.onClick) this.props.onClick(this, ev);
  },
  _outsideClick: function(ev) {
    var isClickInside = ReactDOM.findDOMNode(this).contains(ev.target);

    if (!isClickInside) this._close();
  }
});


/**
 * DropdownItem constructor
 * @class
 */
var DropdownItem = React.createClass({
  propTypes: {
    link: PropTypes.string,
    onClick: PropTypes.func
  },
  getDefaultProps: function() {
    return {
      link: null,
      onClick: null
    };
  },
  render: function() {
    return (
      <li>
        <a href={ this.props.link } onClick={ this._click }>
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
