/**
 * MUI React forms module
 * @module react/forms
 */

'use strict';


var jqLite = require('../js/lib/jqLite.js'),
    forms = require('../js/forms.js');


/**
 * Constructs a FormControl element.
 * @class
 */
var FormControl = React.createClass({
  render: function() {
    return (
      <input
          type={this.props.type || 'text'}
          className={forms.formControlClass}
          value={this.props.value}
          autoFocus={this.props.autofocus}
          onInput={this.props.onInput}
      />
    );
  }
});


/**
 * Constructs a FormGroup element.
 * @class
 */
var FormGroup = React.createClass({
  componentDidMount: function() {
    // use js library to add functionality to label
    forms.initialize(this.refs.label.getDOMNode());
  },
  render: function() {
    var labelText = this.props.label,
        labelEl;
    
    if (labelText) {
      var labelClass = '';

      if (this.props.isLabelFloating) {
        labelClass += ' ' + forms.floatingLabelBaseClass;
      }

      if (this.props.value) {
        labelClass += ' ' + forms.floatingLabelActiveClass;
      }

      labelEl = (
        <label className={labelClass} ref="label">
          {labelText}
        </label>
      );
    }

    return (
      <div className={forms.formGroupClass}>
        <FormControl 
            type={this.props.type}
            value={this.props.value}
            autoFocus={this.props.autofocus}
        />
        {labelEl}
      </div>
    );
  }
});


/** Define module API */
module.exports = {
  /** FormControl constructor */
  FormControl: FormControl,

  /** FormGroup constructor */
  FormGroup: FormGroup
};
