/**
 * MUI React Col Component Tests
 * @module test/react-tests/test-col
 */

import assert from 'assert';
import React from 'react';
import ReactUtils from 'react-addons-test-utils';

import Col from '../../src/react/col';

import { getShallowRendererOutput } from '../lib/react-helpers';


describe('react/grid', function() {
  it('col renders properly', function() {
    let result = getShallowRendererOutput(
      <Col
        xs={ 1 }
        sm={ 2 }
        md={ 3 }
        lg={ 4 }
        xs-offset={ 5 }
        sm-offset={ 6 }
        md-offset={ 7 }
        lg-offset={ 8 }
      >
        My Content
      </Col>
    );

    assert.equal(result.type, 'div');

    let className = result.props.className;
    assert.equal(/mui-col-xs-1/.test(className), true);
    assert.equal(/mui-col-sm-2/.test(className), true);
    assert.equal(/mui-col-md-3/.test(className), true);
    assert.equal(/mui-col-lg-4/.test(className), true);
    assert.equal(/mui-col-xs-offset-5/.test(className), true);
    assert.equal(/mui-col-sm-offset-6/.test(className), true);
    assert.equal(/mui-col-md-offset-7/.test(className), true);
    assert.equal(/mui-col-lg-offset-8/.test(className), true);
  });


  it('renders properly with additional classNames', function() {
    let result = getShallowRendererOutput(
      <Col className="additional">
        test
      </Col>
    );

    assert.equal(result.props.className, ' additional');
  });


  it('renders properly with additional styles', function() {
    let result = getShallowRendererOutput(
      <Col style={{additonal: 'style'}}>
        test
      </Col>
    );

    assert.equal(result.props.style.additonal, 'style');
  });
});
