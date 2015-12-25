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
    assert.equal(result.props.className, undefined);
  });

  
  it('handles inline option', function() {
    let result = getShallowRendererOutput(<Form isInline={ true }></Form>);

    assert.equal(result.type, 'form');
    assert.equal(result.props.className, 'mui-form--inline')
  });
});
