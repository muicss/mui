/**
 * MUI test react divider library
 * @module test/react-tests/test-divider
 */

import React from 'react';
import expect from 'expect';
import expectJSX from 'expect-jsx';
expect.extend(expectJSX);

import * as helpers from '../lib/react-helpers.js';

import {Divider} from '../../src/react/divider.jsx';


describe('react/divider.jsx', () => {
  it('ignores children', () => {
    let actualEl = helpers.renderReactEl(<Divider>test</Divider>);
    let expectedEl = <div className="mui-divider"></div>;
    expect(actualEl).toEqualJSX(expectedEl);
  });
});
