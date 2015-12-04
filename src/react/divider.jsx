/**
 * MUI React divider module
 * @module react/divider
 */

'use strict';


/**
 * Divider constructor
 * @class
 */
var Divider = React.createClass({
  render: function() {
    return (
      <div className='mui-divider'></div>
    );
  }
});


/** Define module API */
module.exports = {
  Divider: Divider
};
