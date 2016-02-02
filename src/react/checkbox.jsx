/**
 * MUI React checkbox module
 * @module react/checkbox
 */

'use strict';

import React from 'react';


const PropTypes = React.PropTypes;


/**
 * Checkbox constructor
 * @class
 */
class Checkbox extends React.Component {
  static propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    checked: PropTypes.bool,
    defaultChecked: PropTypes.bool,
    disabled: PropTypes.bool
  };

  static defaultProps = {
    className: '',
    label: null,
    value: null,
    checked: null,
    defaultChecked: null,
    disabled: false
  };

  render() {
    return (
      <div
        className={'mui-checkbox ' + this.props.className}
        style={this.props.style}
      >
        <label>
          <input
              type="checkbox"
              value={this.props.value}
              checked={this.props.checked}
              defaultChecked={this.props.defaultChecked}
              disabled={this.props.disabled}
          />
          {this.props.label}
        </label>
      </div>
    );
  }
}


/** Define module API */
export default Checkbox;
