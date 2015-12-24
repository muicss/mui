/**
 * MUI test react appbar library
 * @module test/react-tests/test-appbar
 */

import expect from 'expect';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactUtils from 'react-addons-test-utils';

import * as util from '../../src/js/lib/util.js';
import {Button} from '../../src/react/button.jsx';

import * as helpers from '../lib/react-helpers.js';


describe('react/button.jsx', () => {
  it('handles children', () => {
    let domNode = helpers.renderReactEl(<Button>test</Button>);
    expect(domNode.type).toBe('button');
    expect(domNode.props.children).toEqual(['test', []]);
  });

  
  it('supports colors', () => {
    let reactNode = <Button color="primary">test</Button>;
    expect(reactNode.props.color).toBe('primary');

    let domNode = helpers.renderReactEl(reactNode);
    expect(/mui-btn--primary/.test(domNode.props.className)).toBe(true);
  });


  it('supports variants', () => {
    let reactNode = <Button variant="raised">test</Button>;
    expect(reactNode.props.variant).toBe('raised');

    let domNode = helpers.renderReactEl(reactNode);
    expect(/mui-btn--raised/.test(domNode.props.className)).toBe(true);
  });


  it('supports sizes', () => {
    let reactNode = <Button size="large">test</Button>;
    expect(reactNode.props.size).toBe('large');

    let domNode = helpers.renderReactEl(reactNode);
    expect(/mui-btn--large/.test(domNode.props.className)).toBe(true);
  });
  

  it('supports click callbacks', done => {
    // define callback
    let fn = () => {
      done();
    }
    
    let reactNode = <Button onClick={ fn }>test</Button>;
    
    expect(reactNode.props.onClick).toBe(fn);
    reactNode.props.onClick();
  });
});
