/**
 * MUI test react panel library
 * @module test/react-tests/test-panel
 */

import React from 'react';
import expect from 'expect';
import expectJSX from 'expect-jsx';
expect.extend(expectJSX);

import * as helpers from './helpers.js';

import {Panel} from '../../src/react/panel.jsx';


describe('react/panel.jsx', () => {
  it('handles children', () => {
    let actualEl = helpers.renderReactEl(<Panel>test</Panel>);
    let expectedEl = <div className="mui-panel">test</div>;
    expect(actualEl).toEqualJSX(expectedEl);
  });
});
