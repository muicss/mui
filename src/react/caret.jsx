/**
 * MUI React Caret Module
 * @module react/caret
 */

'use strict';

/**
 * Caret constructor
 * @class
 */
var Caret = React.createClass({
  render: function() {
    return (
      <div className="mui-caret"></div>
    );
  }
});


/** Define module API */
module.exports = {
  Caret: Caret
};
