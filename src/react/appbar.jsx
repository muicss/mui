/**
 * MUI React Appbar Module
 * @module react/appbar
 */

'use strict';


/**
 * Appbar constructor
 * @class
 */
class Appbar extends React.Component {
  render() {
    return (
      <div className="mui-appbar">
        { this.props.children }
      </div>
    );
  }
}


/** Define module API */
export {Appbar};
