/**
 * MUI React layout module
 * @module react/layout
 */

'use strict';


/**
 * Panel constructor
 * @class
 */
var Panel = React.createClass({
  render: function() {
    return (
      <div className='mui-panel'>
        { this.props.children }
      </div>
    );
  }
});


/** Define module API */
module.exports = {
  Panel: Panel
};
