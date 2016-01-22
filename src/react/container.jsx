/**
 * MUI React container module
 * @module react/container
 */

'use strict';

import React from 'react';


/**
 * Container constructor
 * @class
 */
class Container extends React.Component {
  static propTypes = {
    isFluid: React.PropTypes.bool
  };

  static defaultProps = {
    className: '',
    isFluid: false
  };

  render() {
    var cls = 'mui-container';

    // fluid containers
    if (this.props.isFluid) cls += '-fluid';

    return (
      <div
        className={cls + ' ' + this.props.className}
        style={this.props.style}
      >
        {this.props.children}
      </div>
    );
  }
}


/** Define module API */
export default Container;
