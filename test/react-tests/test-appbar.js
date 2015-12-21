/**
 * MUI test react appbar library
 * @module test/react-tests/test-appbar
 */

import React from 'react';
import expect from 'expect';
import expectJSX from 'expect-jsx';
expect.extend(expectJSX);

import * as helpers from '../lib/react-helpers.js';

import {Appbar} from '../../src/react/appbar.jsx';


describe('react/appbar.jsx', () => {
  it('handles children', () => {
    let actualEl = helpers.renderReactEl(<Appbar>test</Appbar>);
    let expectedEl = <div className="mui-appbar">test</div>;
    expect(actualEl).toEqualJSX(expectedEl);
  });
});
