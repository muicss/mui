/**
 * MUI React checkbox module
 * @module react/forms/checkbox
 */

'use strict';

var PropTypes = React.PropTypes;


/**
 * Checkbox constructor
 * @class
 */
var Checkbox = React.createClass({
  propTypes: {
    label: PropTypes.string,
    value: PropTypes.string,
    isDisabled: PropTypes.bool
  },
  getDefaultProps: function() {
    return {
      label: null,
      value: null,
      isDisabled: false
    };
  },
  render: function() {
    return (
      <div className="mui-checkbox">
        <label>
          <input
              type="checkbox"
              value={ this.props.value }
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
  Checkbox: Checkbox
};
