/**                                                                            
 * MUI React Input Component
 * @module react/input
 */

'use strict';

import React from 'react';

import { textfieldWrapper } from './_textfieldHelpers';

/**
 * Input constructor
 * @class
 */
const Input = textfieldWrapper(props => {
  const { inputRef, ...rest } = props;
  return <input ref={inputRef} {...rest} />;
});


/** Module API */
export default Input;
