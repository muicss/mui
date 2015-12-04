/**
 * MUI React layout module
 * @module react/layout
 */

'use strict';


/**
 * Container constructor
 * @class
 */
var Container = React.createClass({
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
