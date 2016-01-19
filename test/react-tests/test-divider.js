/**
 * MUI test react divider library
 * @module test/react-tests/test-divider
 */

import assert from 'assert';
import React from 'react';

import Divider from '../../src/react/divider';

import { getShallowRendererOutput } from '../lib/react-helpers';


describe('react/divider', function() {
  it('renders properly', function() {
    let result = getShallowRendererOutput(<Divider>test</Divider>);

    assert.equal(result.type, 'div');
    assert.equal(result.props.className, 'mui-divider ');
    assert.equal(result.props.children, undefined);
  });


  it('renders properly with additional classNames', function() {
    let result = getShallowRendererOutput(
      <Divider className="additional">
        test
      </Divider>
    );

    assert.equal(result.props.className, 'mui-divider additional');
  });


  it('renders properly with additional styles', function() {
    let result = getShallowRendererOutput(
      <Divider style={{additonal: 'style'}}>
        test
      </Divider>
    );

    assert.equal(result.props.style.additonal, 'style');
  });
});
