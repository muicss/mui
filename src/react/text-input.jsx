/**                                                                            
 * MUI React TextareaInput Component
 * @module react/textarea-input
 */

'use strict';

import React from 'react';

import { TextField } from './_input';


const PropTypes = React.PropTypes;


/**
 * TextInput constructor
 * @class
 */
class TextInput extends React.Component {
  static propTypes = {
    type: PropTypes.oneOf(['text', 'email', 'password'])
  };

  static defaultProps = {
    type: 'text'
  };

  render() {
    return <TextField {...this.props} />;
  }
}


export default TextInput;
