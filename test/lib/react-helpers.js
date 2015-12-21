/**
 * React Test helpers
 * @module test/react-tests/react-helpers
 */

import {createRenderer} from 'react-addons-test-utils';


function renderReactEl(jsx) {
  let r = createRenderer();
  r.render(jsx);
  
  return r.getRenderOutput();
}


export {renderReactEl};
