/**
 * MUI React Textarea Component
 * @module react/textarea
 */

'use strict';

import React from 'react';

import { textfieldWrapper } from './_textfieldHelpers';


/**
 * Textarea constructor
 * @class
 */
const Textarea = textfieldWrapper(props => {
  const { inputRef, ...rest } = props;

  // default number of rows
  if (!'rows' in rest) rest.rows = 2;

  return <textarea ref={inputRef} {...rest} />;
});


export default Textarea;
