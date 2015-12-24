/**
 * MUI test react appbar library
 * @module test/react-tests/test-appbar
 */

import assert from 'assert';
import React from 'react';

import { Appbar } from '../../src/react/appbar.jsx';

import { getShallowRendererOutput } from '../lib/react-helpers';


describe('react/appbar', () => {
  it('renders properly', () => {
    let node = getShallowRendererOutput(<Appbar>test</Appbar>);

    assert.equal(node.type, 'div');
    assert.equal(node.props.className, 'mui-appbar')
    assert.equal(node.props.children, 'test');
  });
});
