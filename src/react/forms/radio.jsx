/**
 * MUI React radio module
 * @module react/forms/radio
 */

'use strict';

var PropTypes = React.PropTypes;


/**
 * Radio constructor
 * @class
 */
var Radio = React.createClass({
  propTypes: {
    name: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    isChecked: PropTypes.bool,
    isDisabled: PropTypes.bool
  },
  getDefaultProps: function() {
    return {
      name: null,
      label: null,
      value: null,
      isChecked: false,
      isDisabled: false
    };
  },
  render: function() {
    return (
      <div className="mui-radio">
        <label>
          <input
              type="radio"
              name={ this.props.name }
              value={ this.props.value }
              defaultChecked={ this.props.isChecked }
              disabled={ this.props.isDisabled }
          />
          { this.props.label }
        </label>
      </div>
    );
  }
});


/** Define module API */
module.exports = {
  Radio: Radio
};
