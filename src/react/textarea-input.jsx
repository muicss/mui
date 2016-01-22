/**
 * MUI React TextareaInput Component
 * @module react/textarea-input
 */

'use strict';

import React from 'react';

import { TextField } from './_input';


const PropTypes = React.PropTypes;


/**
 * TextareaInput constructor
 * @class
 */
class TextareaInput extends React.Component {
  static propTypes = {
    rows: PropTypes.number
  };

  static defaultProps = {
    type: 'textarea',
    rows: 2
  };

  render() {
    return <TextField {...this.props} />;
  }
}


export default TextareaInput;
