/**
 * MUI React Appbar Module
 * @module react/appbar
 */

'use strict';

import React from 'react';


/**
 * Appbar constructor
 * @class
 */
class Appbar extends React.Component {
  static defaultProps = {
    className: ''
  };

  render() {
    const { children, ...reactProps } = this.props;

    return (
      <div
        { ...reactProps }
        className={'mui-appbar ' + this.props.className}
      >
        {children}
      </div>
    );
  }
}


/** Define module API */
export default Appbar;
