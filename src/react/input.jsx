/**                                                                            
 * MUI React Input Component
 * @module react/input
 */

'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import { TextField } from './text-field';


/**
 * Input constructor
 * @class
 */
class Input extends React.Component {
  static propTypes = {
    type: PropTypes.oneOf(['text', 'email', 'url', 'tel', 'password'])
  };

  static defaultProps = {
    type: 'text'
  };

  render() {
    return <TextField { ...this.props } />;
  }
}


export default Input;
