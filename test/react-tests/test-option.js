/**
 * MUI test react option library
 * @module test/react-tests/test-option
 */

import assert from 'assert';
import createClass from 'create-react-class';
import React from 'react';
import ReactUtils from 'react-dom/test-utils';

import Option from '../../src/react/option';

import { getShallowRendererOutput } from '../lib/react-helpers';


describe('react/option', function () {

  it('renders element properly', function() {
    let result = getShallowRendererOutput(<Option label="Option 1" />);

    assert.equal(result.type, 'option');
    assert.equal(result.props.children, 'Option 1');
  });


  it('renders properly with additional classNames', function() {
    let result = getShallowRendererOutput(<Option className="additional" />);

    assert.equal(result.props.className, 'additional');
  });


  it('renders properly with additional styles', function() {
    let result = getShallowRendererOutput(
        <Option style={{ additional: 'style' }} />
    );

    assert.equal(result.props.style.additional, 'style');
  });
});
