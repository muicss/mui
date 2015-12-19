/**
 * MUI React layout module
 * @module react/layout
 */

'use strict';


/**
 * Panel constructor
 * @class
 */
class Panel extends React.Component {
  render() {
    return (
      <div className='mui-panel'>
        { this.props.children }
      </div>
    );
  }
}


/** Define module API */
export {Panel};
