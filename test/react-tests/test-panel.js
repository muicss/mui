/**
 * MUI test react panel library
 * @module test/react-tests/test-panel
 */

import assert from 'assert';
import React from 'react';

import { Panel } from '../../src/react/panel.jsx';

import { getShallowRendererOutput } from '../lib/react-helpers';


describe('react/panel', () => {
  it('renders properly', () => {
    let node = getShallowRendererOutput(<Panel>test</Panel>);

    assert.equal(node.type, 'div');
    assert.equal(node.props.className, 'mui-panel');
    assert.equal(node.props.children, 'test');
  });
});
