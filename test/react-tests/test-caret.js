/**
 * MUI test react caret library
 * @module test/react-tests/test-caret
 */

import React from 'react';
import expect from 'expect';
import expectJSX from 'expect-jsx';
expect.extend(expectJSX);

import * as helpers from './helpers.js';

import {Caret} from '../../src/react/caret.jsx';


describe('react/caret.jsx', () => {
  it('ignores children', () => {
    let actualEl = helpers.renderReactEl(<Caret>test</Caret>);
    let expectedEl = <span className="mui-caret"></span>;
    expect(actualEl).toEqualJSX(expectedEl);
  });
});
