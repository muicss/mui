/**
 * MUI React divider module
 * @module react/divider
 */

'use strict';

import React from 'react';


/**
 * Divider constructor
 * @class
 */
class Divider extends React.Component {
  static defaultProps = {
    className: ''
  };

  render() {
    const { children, className, ...reactProps } = this.props;

    return (
      <div
        { ...reactProps }
        className={'mui-divider ' + className }
      >
      </div>
    );
  }
}


/** Define module API */
export default Divider;
