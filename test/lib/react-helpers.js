/**
 * React Test helpers
 * @module test/react-tests/react-helpers
 */

import { createRenderer } from 'react-test-renderer/shallow';


export function getShallowRendererOutput(reactElem) {
  const shallowRenderer = createRenderer();
  shallowRenderer.render(reactElem);
  return shallowRenderer.getRenderOutput();
}
