/**
 * MUI React forms module
 * @module react/forms
 */

'use strict';

var util = require('../js/lib/util.js');

var textfieldClass = 'mui-textfield',
    floatMod = '--float-label',
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
      placeholder: '',
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

    cls[isEmptyClass] = !isNotEmpty;
    cls[isNotEmptyClass] = isNotEmpty;
    cls[isDirtyClass] = this.state.isDirty;

    cls = util.classNames(cls);

    if (this.props.type === 'textarea') {
      inputEl = (
        <textarea
          ref="input"
          className={ cls }
          placeholder={ this.props.placeholder }
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
          placeholder={ this.props.placeholder }
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
      placeholder: '',
      isLabelFloating: false,
      autofocus: false,
      onChange: null
    };
  },
  render: function() {
    var cls = {},
        labelEl;

    if (this.props.label.length) {
      labelEl = (
        <Label
          text={ this.props.label }
          onClick={ this._focus }
        />
      );
    }

    cls[textfieldClass] = true;
    cls[textfieldClass + floatMod] = this.props.isLabelFloating;
    cls = util.classNames(cls);

    return (
      <div className={ cls }>
        <Input
          type={ this.props.type }
          value={ this.props.value }
          placeholder={ this.props.placeholder }
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
      ReactDOM.findDOMNode(this.refs.input).focus();
    }
  }
});


/** Define module API */
module.exports = {
  Textfield: Textfield
};
