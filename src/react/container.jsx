/**
 * MUI React container module
 * @module react/container
 */

'use strict';


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

    return (
      <div className={ cls }>
        { this.props.children }
      </div>
    );
  }
}


/** Define module API */
export {Container};
