/**
 * MUI test react divider library
 * @module test/react-tests/test-divider
 */

import assert from 'assert';
import React from 'react';

import { Divider } from '../../src/react/divider.jsx';

import { getShallowRendererOutput } from '../lib/react-helpers';


describe('react/divider', () => {
  it('renders properly', () => {
    let node = getShallowRendererOutput(<Divider>test</Divider>);
    
    assert.equal(node.type, 'div');
    assert.equal(node.props.className, 'mui-divider');
    assert.equal(node.props.children, undefined);
  });
});
