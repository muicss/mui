/**
 * MUI React forms module
 * @module react/forms
 */

'use strict';

var util = require('../js/lib/util.js');

var formControlClass = 'mui-form-control',
    formGroupClass = 'mui-form-group',
    floatingLabelBaseClass = 'mui-form-floating-label',
    floatingLabelActiveClass = floatingLabelBaseClass + '-active';


/**
 * FormControl constructor
 * @class
 */
var FormControl = React.createClass({
  render: function() {
    return (
      <input
        type={this.props.type || 'text'}
        className={ formControlClass }
        value={this.props.value}
        autoFocus={this.props.autofocus}
        onInput={this.props.onInput}
      />
    );
  }
});


/**
 * FormLabel constructor
 * @class
 */
var FormLabel = React.createClass({
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
    var labelText = this.props.text,
        labelClass;
    
    if (labelText) {
      labelClass = {};
      labelClass[floatingLabelBaseClass] = this.props.floating;
      labelClass[floatingLabelActiveClass] = this.props.active;
      labelClass = util.classNames(labelClass);
    }
    
    return (
      <label
        className={ labelClass }
        style={ this.state.style }
        onClick={ this.props.onClick }
      >
        { labelText }
      </label>
    );
  }
});


/**
 * FormGroup constructor
 * @class
 */
var FormGroup = React.createClass({
  getInitialState: function() {
    return {
      hasInput: false
    };
  },
  componentDidMount: function() {
    if (this.props.value) {
      this.setState({
        hasInput: true
      });
    }
  },
  render: function() {
    var labelText = this.props.label;
    return (
      <div className={ formGroupClass }>
        <FormControl 
          type={this.props.type}
          value={this.props.value}
          autoFocus={this.props.autofocus}
          onInput={ this._input }
        />
        { labelText &&
          <FormLabel
            text={labelText}
            onClick={ this._focus }
            active={ this.state.hasInput }
            floating={ this.props.isLabelFloating }
          />
        }
      </div>
    );
  },
  _focus: function (e) {
    // pointer-events shim
    if (util.supportsPointerEvents() === false) {
      var labelEl = e.target;
      labelEl.style.cursor = 'text';

      if (!this.state.hasInput) {
        var inputEl = React.findDOMNode(this.refs.input);
        inputEl.focus();
      }
    }
  },
  _input: function (e) {
    if (e.target.value) {
      this.setState({
        hasInput: true 
      });
    } else {
      this.setState({
        hasInput: false 
      });
    }

    if (this.props.onClick) {
      this.props.onClick(e);
    }
  }
});


/** Define module API */
module.exports = {
  FormControl: FormControl,
  FormGroup: FormGroup
};
