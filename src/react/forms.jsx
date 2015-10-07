/**
 * MUI React forms module
 * @module react/forms
 */

'use strict';

var util = require('../js/lib/util.js');

var textfieldClass = 'mui-textfield',
    textfieldInputClass = 'mui-textfield__input',
    floatingLabelClass = 'mui-textfield__label--floating',
    isEmptyClass = 'mui--is-empty',
    isNotEmptyClass = 'mui--is-not-empty',
    isDirtyClass = 'mui--is-dirty';


/**
 * Input constructor
 * @class
 */
var Input = React.createClass({
  getDefaultProps: function() {
    return {
      value: '',
      type: 'text',
      autofocus: false,
      onChange: null
    };
  },
  getInitialState: function() {
    return {
      value: this.props.value,
      isDirty: Boolean(this.props.value.length)
    };
  },
  render: function() {
    var cls = {},
        isNotEmpty = Boolean(this.state.value),
        inputEl;

    cls[textfieldInputClass] = true;
    cls[isEmptyClass] = !isNotEmpty;
    cls[isNotEmptyClass] = isNotEmpty;
    cls[isDirtyClass] = this.state.isDirty;

    cls = util.classNames(cls);

    if (this.props.type === 'textarea') {
      inputEl = (
        <textarea
          ref="input"
          className={ cls }
          value={ this.props.value }
          autoFocus={ this.props.autofocus }
          onChange={ this._handleChange }
          onFocus={ this._handleFocus }
        />
      );
    } else {
      inputEl = (
        <input
          ref="input"
          className={ cls }
          type={ this.props.type }
          value={ this.state.value }
          autoFocus={ this.props.autofocus }
          onChange={ this._handleChange }
          onFocus={ this._handleFocus }
        />
      );
    }

    return inputEl;
  },
  _handleChange: function(ev) {
    this.setState({value: ev.target.value});
    if (this.props.onChange) this.props.onChange(ev);
  },
  _handleFocus: function(ev) {
    this.setState({isDirty: true});
  }
});


/**
 * Label constructor
 * @class
 */
var Label = React.createClass({
  getDefaultProps: function() {
    return {
      text: '',
      floating: false,
      onClick: null
    };
  },
  getInitialState: function() {
    return {
      style: {}
    };
  },
  componentDidMount: function() {
    setTimeout(function() {
      var s = '.15s ease-out',
          style;

      style = {
        transition: s,
        WebkitTransition: s,
        MozTransition: s,
        OTransition: s,
        msTransform: s
      };

      this.setState({
        style: style
      });
    }.bind(this), 150);
  },
  render: function() {
    return (
      <label
        refs="label"
        className={ (this.props.floating) ? floatingLabelClass : '' }
        style={ this.state.style }
        onClick={ this.props.onClick }
      >
        { this.props.text }
      </label>
    );
  }
});




/**
 * Textfield constructor
 * @class
 */
var Textfield = React.createClass({
  getDefaultProps: function() {
    return {
      type: 'text',
      value: '',
      label: '',
      isLabelFloating: false,
      autofocus: false,
      onChange: null
    };
  },
  render: function() {
    var labelEl;

    if (this.props.label.length) {
      labelEl = (
        <Label
          text={ this.props.label }
          onClick={ this._focus }
          floating={ this.props.isLabelFloating }
        />
      );
    }

    return (
      <div className={ textfieldClass }>
        <Input
          type={ this.props.type }
          value={ this.props.value }
          autoFocus={ this.props.autofocus }
          onChange={ this.props.onChange }
        />
        { labelEl }
      </div>
    );
  },
  _focus: function(e) {
    // pointer-events shim
    if (util.supportsPointerEvents() === false) {
      e.target.style.cursor = 'text';
      React.findDOMNode(this.refs.input).focus();
    }
  }
});


/** Define module API */
module.exports = {
  Textfield: Textfield
};
