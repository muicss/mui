/**
 * MUI test react caret library
 * @module test/react-tests/test-caret
 */

import assert from 'assert';
import React from 'react';

import { Caret } from '../../src/react/caret.jsx';

import { getShallowRendererOutput } from '../lib/react-helpers';


describe('react/caret', () => {
  it('renders properly', () => {
    let node = getShallowRendererOutput(<Caret>test</Caret>);

    assert.equal(node.type, 'span');
    assert.equal(node.props.className, 'mui-caret');
    assert.equal(node.props.children, undefined);
  });
});
