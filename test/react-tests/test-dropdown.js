/**
 * MUI test react appbar library
 * @module test/react-tests/test-appbar
 */

import expect from 'expect';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactUtils from 'react-addons-test-utils';

import * as util from '../../src/js/lib/util.js';
import {Dropdown, DropdownItem} from '../../src/react/dropdown.jsx';

import * as helpers from '../lib/react-helpers.js';


describe('react/dropdown.jsx', () => {
  it('renders button component', () => {
    let reactNode = (
      <Dropdown>
        <DropdownItem>Option 1</DropdownItem>
        <DropdownItem>Option 2</DropdownItem>
        <DropdownItem>Option 3</DropdownItem>
      </Dropdown>
    );

    let domNode = helpers.renderReactEl(reactNode);
  });
});
