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
    fluid: React.PropTypes.bool
  };

  static defaultProps = {
    className: '',
    fluid: false
  };

  render() {
    var cls = 'mui-container';

    // fluid containers
    if (this.props.fluid) cls += '-fluid';

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
