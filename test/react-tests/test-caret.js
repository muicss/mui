/**
 * MUI test react caret library
 * @module test/react-tests/test-caret
 */

import assert from 'assert';
import React from 'react';

import { Caret } from '../../src/react/caret.jsx';

import { getShallowRendererOutput } from '../lib/react-helpers';


describe('react/caret', function() {
  it('renders properly', function() {
    let result = getShallowRendererOutput(<Caret>test</Caret>);

    assert.equal(result.type, 'span');
    assert.equal(result.props.className, 'mui-caret');
    assert.equal(result.props.children, undefined);
  });
});
