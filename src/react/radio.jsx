/**
 * MUI React radio module
 * @module react/radio
 */

'use strict';

import React from 'react';


const PropTypes = React.PropTypes;


/**
 * Radio constructor
 * @class
 */
class Radio extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    checked: PropTypes.bool,
    defaultChecked: PropTypes.bool,
    disabled: PropTypes.bool
  };

  static defaultProps = {
    className: '',
    name: null,
    label: null,
    value: null,
    checked: null,
    defaultChecked: null,
    disabled: false
  };

  render() {
    return (
      <div
        className={'mui-radio ' + this.props.className}
        style={this.props.style}
      >
        <label>
          <input
              type="radio"
              name={this.props.name}
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
export default Radio;
