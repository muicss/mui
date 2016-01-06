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
  }

  static defaultProps = {
    isFluid: false
  }

  render() {
    var cls = 'mui-container';

    // fluid containers
    if (this.props.isFluid) cls += '-fluid';

    const className = !this.props.className
      ? cls
      : `${cls} ${this.props.className}`;

    const style = {...this.props.style};

    return (
      <div className={ className } style={ style }>
        { this.props.children }
      </div>
    );
  }
}


/** Define module API */
export { Container };
