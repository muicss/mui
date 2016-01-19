/**
 * MUI React Row Component Tests
 * @module test/react-tests/test-row
 */

import assert from 'assert';
import React from 'react';
import ReactUtils from 'react-addons-test-utils';

import Row from '../../src/react/row';

import { getShallowRendererOutput } from '../lib/react-helpers';


describe('react/grid', function() {
  it('row renders properly', function() {
    let result = getShallowRendererOutput(<Row></Row>);
    assert.equal(result.type, 'div');
    assert.equal(result.props.className, 'mui-row ');
  });


  it('renders properly with additional classNames', function() {
    let result = getShallowRendererOutput(
      <Row className="additional">
        test
      </Row>
    );

    assert.equal(result.props.className, 'mui-row additional');
  });


  it('renders properly with additional styles', function() {
    let result = getShallowRendererOutput(
      <Row style={{additonal: 'style'}}>
        test
      </Row>
    );

    assert.equal(result.props.style.additonal, 'style');
  });
});
