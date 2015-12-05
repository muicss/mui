/**
 * MUI React container module
 * @module react/container
 */

'use strict';


/**
 * Container constructor
 * @class
 */
var Container = React.createClass({
  propTypes: {
    isFluid: React.PropTypes.bool
  },
  getDefaultProps: function() {
    return {
      isFluid: false
    };
  },
  render: function() {
    var cls = 'mui-container';

    // fluid containers
    if (this.props.isFluid) cls += '-fluid';

    return (
      <div className={ cls }>
        { this.props.children }
      </div>
    );
  }
});


/** Define module API */
module.exports = {
  Container: Container
};
