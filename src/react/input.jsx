/**                                                                            
 * MUI React Input Component
 * @module react/input
 */

'use strict';

import React from 'react';

import { TextField } from './text-field';


/**
 * Input constructor
 * @class
 */
class Input extends React.Component {
  static defaultProps = {
    type: 'text'
  };

  render() {
    return (
      <TextField
        { ...this.props }
        ref={el => { if (el) this.controlEl = el.inputElRef.inputElRef; }}
      />
    );
  }
}


export default Input;
