/**
 * MUI test react container library
 * @module test/react-tests/test-container
 */

import React from 'react';
import expect from 'expect';
import expectJSX from 'expect-jsx';
expect.extend(expectJSX);

import * as helpers from '../lib/react-helpers.js';

import {Container} from '../../src/react/container.jsx';


describe('react/container.jsx', () => {
  it('defaults to standard container', () => {
    let actualEl = helpers.renderReactEl(<Container>test</Container>);
    let expectedEl = <div className="mui-container">test</div>;
    expect(actualEl).toEqualJSX(expectedEl);
  });


  it('handles isFluid option', () => {
    let actualEl = helpers.renderReactEl(
        <Container isFluid={ true }>
          test
        </Container>
    );
    let expectedEl = <div className="mui-container-fluid">test</div>;
    expect(actualEl).toEqualJSX(expectedEl);
  });
});
