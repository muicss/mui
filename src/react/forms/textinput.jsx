/**
 * MUI React textinput module
 * @module react/forms/textinput
 */

'use strict';

var util = require('../../js/lib/util.js'),
    PropTypes = React.PropTypes;


/**
 * Input constructor
 * @class
 */
var Input = React.createClass({
  propTypes: {
    type: PropTypes.string,
    value: PropTypes.string,
    hint: PropTypes.string,
    isAutofocus: PropTypes.bool,
    onChange: PropTypes.func
  },
  getDefaultProps: function() {
    return {
      type: null,
      value: '',
      hint: null,
      isAutofocus: false,
      onChange: null
    };
  },
  getInitialState: function() {
    var v = this.props.value;

    return {
      value: v,
      isDirty: Boolean(v.length)
    };
  },
  render: function() {
    var cls = {},
        isNotEmpty = Boolean(this.state.value),
        inputEl;

    cls['mui--is-empty'] = !isNotEmpty;
    cls['mui--is-not-empty'] = isNotEmpty;
    cls['mui--is-dirty'] = this.state.isDirty;

    cls = util.classNames(cls);

    if (this.props.type === 'textarea') {
      inputEl = (
        <textarea
          ref="input"
          className={ cls }
          rows={ this.props.rows }
          placeholder={ this.props.hint }
          defaultValue={ this.props.value }
          autoFocus={ this.props.isAutofocus }
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
          placeholder={ this.props.hint }
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
 * TextField constructor
 * @class
 */
var TextField = React.createClass({
  propTypes: {
    label: PropTypes.string,
    isLabelFloating: PropTypes.bool
  },
  getDefaultProps: function() {
    return {
      label: '',
      isLabelFloating: false
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

    cls['mui-textfield'] = true;
    cls['mui-textfield--float-label'] = this.props.isLabelFloating;
    cls = util.classNames(cls);

    return (
      <div className={ cls }>
        <Input { ...this.props } />
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


/**
 * TextInput constructor
 * @class
 */
var TextInput = React.createClass({
  propTypes: {
    type: PropTypes.oneOf(['text', 'email', 'password'])
  },
  getDefaultProps: function() {
    return {
      type: 'text'
    };
  },
  render: function() {
    return (<TextField { ...this.props } />);
  }
});


/**
 * TextareaInput constructor
 * @class
 */
var TextareaInput = React.createClass({
  propTypes: {
    rows: PropTypes.number
  },
  getDefaultProps: function() {
    return {
      type: 'textarea',
      rows: 2
    };
  },
  render: function() {
    return (<TextField { ...this.props } />);
  }
});


/** Define module API */
module.exports = {
  TextInput: TextInput,
  TextareaInput: TextareaInput
};
