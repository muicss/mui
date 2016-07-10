/**
 * MUI React layout module
 * @module react/layout
 */

'use strict';

import React from 'react';


/**
 * Panel constructor
 * @class
 */
class Panel extends React.Component {
  static defaultProps = {
    className: ''
  };

  render() {
    const { children, className, ...reactProps } = this.props;

    return (
      <div
        { ...reactProps }
        className={'mui-panel ' + className}
      >
        {children}
      </div>
    );
  }
}


/** Define module API */
export default Panel;
