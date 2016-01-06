/**
 * MUI test react form component
 * @module test/react-tests/test-form
 */

import assert from 'assert';
import React from 'react';

import { Form } from '../../src/react/form.jsx';

import { getShallowRendererOutput } from '../lib/react-helpers';


describe('react/form', function() {
  it('renders wrapper properly', function() {
    let result = getShallowRendererOutput(<Form></Form>);

    assert.equal(result.type, 'form');
    assert.equal(result.props.className, '');
  });

  it('renders properly with additional classNames', function() {
    let result = getShallowRendererOutput(<Form className="additional">test</Form>);

    assert.equal(result.props.className, ' additional');
  });

  it('renders properly with additional styles', function() {
    let result = getShallowRendererOutput(<Form style={{additonal: 'style'}}>test</Form>);

    assert.equal(result.props.style.additonal, 'style');
  });

  it('handles inline option', function() {
    let result = getShallowRendererOutput(<Form isInline={ true }></Form>);

    assert.equal(result.type, 'form');
    assert.equal(result.props.className, 'mui-form--inline')
  });
});
