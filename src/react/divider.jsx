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
    let { children, ...other } = this.props;

    return (
      <div
        { ...other }
        className={'mui-divider ' + this.props.className }
      >
      </div>
    );
  }
}


/** Define module API */
export default Divider;
