/**
 * MUI React container module
 * @module react/container
 */

'use strict';

import React from 'react';
import PropTypes from 'prop-types';


/**
 * Container constructor
 * @class
 */
class Container extends React.Component {
  static propTypes = {
    fluid: PropTypes.bool
  };

  static defaultProps = {
    className: '',
    fluid: false
  };

  render() {
    const { children, className, fluid, ...reactProps } = this.props;

    let cls = 'mui-container';

    // fluid containers
    if (fluid) cls += '-fluid';
    
    return (
      <div
        { ...reactProps }
        className={cls + ' ' + className}
      >
        {children}
      </div>
    );
  }
}


/** Define module API */
export default Container;
