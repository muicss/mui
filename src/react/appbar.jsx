/**
 * MUI React Appbar Module
 * @module react/appbar
 */

'use strict';

/**
 * Appbar constructor
 * @class
 */
var Appbar = React.createClass({
  render: function() {
    return (
      <div className="mui-appbar">
        { this.props.children }
      </div>
    );
  }
});


/** Define module API */
module.exports = {
  Appbar: Appbar
};
