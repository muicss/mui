/**
 * MUI test react appbar library
 * @module test/react-tests/test-appbar
 */

import assert from 'assert';
import React from 'react';
import ReactUtils from 'react-addons-test-utils';

import { Dropdown, DropdownItem } from '../../src/react/dropdown.jsx';

import { getShallowRendererOutput } from '../lib/react-helpers';


describe('react/dropdown', () => {
  it('renders button component', () => {
    let node = getShallowRendererOutput(
      <Dropdown>
        <DropdownItem>Option 1</DropdownItem>
        <DropdownItem>Option 2</DropdownItem>
        <DropdownItem>Option 3</DropdownItem>
      </Dropdown>
    );

    assert.equal(node.type, 'div');
    assert.equal(node.props.className, 'mui-dropdown');

    // check that button is first child
    let a = (
      <Dropdown>
        <DropdownItem>Option 1</DropdownItem>
        <DropdownItem>Option 2</DropdownItem>
        <DropdownItem>Option 3</DropdownItem>
      </Dropdown>
    );

    //ReactUtils.renderIntoDocument(a);
    /*
    let c = new Dropdown({});
    console.log(c);
    let b = ReactUtils.findRenderedDOMComponentWithClass(c, 'button');
    console.log(b);*/
  });
});
