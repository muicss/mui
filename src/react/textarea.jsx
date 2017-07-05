/**
 * MUI React Textarea Component
 * @module react/textarea
 */

'use strict';

import React from 'react';

import { TextField } from './text-field';


/**
 * Textarea constructor
 * @class
 */
class Textarea extends React.Component {
  static defaultProps = {
    type: 'textarea'
  };

  render() {
    return <TextField { ...this.props } />;
  }
}


export default Textarea;
