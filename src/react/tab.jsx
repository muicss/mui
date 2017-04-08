/**
 * MUI React tabs module
 * @module react/tabs
 */
/* jshint quotmark:false */
// jscs:disable validateQuoteMarks

'use strict';

import React from 'react';
import PropTypes from 'prop-types';


/**
 * Tab constructor
 * @class
 */
class Tab extends React.Component {
  static propTypes = {
    value: PropTypes.any,
    label: PropTypes.string,
    onActive: PropTypes.func
  };

  static defaultProps = {
    value: null,
    label: '',
    onActive: null
  };

  render() {
    return null;
  };
}


/** Define module API */
export default Tab;
