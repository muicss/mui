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
    let { children, ...other } = this.props;

    return (
      <div
        { ...other }
        className={'mui-radio ' + this.props.className}
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
