/**
 * MUI test react divider library
 * @module test/react-tests/test-divider
 */

import assert from 'assert';
import React from 'react';

import { Divider } from '../../src/react/divider.jsx';

import { getShallowRendererOutput } from '../lib/react-helpers';


describe('react/divider', function() {
  it('renders properly', function() {
    let result = getShallowRendererOutput(<Divider>test</Divider>);
    
    assert.equal(result.type, 'div');
    assert.equal(result.props.className, 'mui-divider');
    assert.equal(result.props.children, undefined);
  });
});
