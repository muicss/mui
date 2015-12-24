/**
 * MUI test react appbar library
 * @module test/react-tests/test-appbar
 */

import expect from 'expect';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactUtils from 'react-addons-test-utils';

import * as helpers from '../lib/react-helpers.js';

import {Button} from '../../src/react/button.jsx';


describe('react/button.jsx', () => {
  it('handles children', () => {
    let el = helpers.renderReactEl(<Button>test</Button>);
    expect(el.type).toBe('button');
    expect(el.props.children).toEqual(['test', []]);
  });

  
  it('supports variants', () => {
    let el = helpers.renderReactEl(<Button variant="raised">test</Button>);
  });
});
