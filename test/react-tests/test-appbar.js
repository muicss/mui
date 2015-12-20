/**
 * MUI test react appbar library
 * @module test/react-tests/test-appbar
 */


describe('react/button.jsx', () => {
  let assert = require('assert'),
      helpers = require('../lib/helpers.js'),
      Appbar;

  helpers.initDOM();

  
  before(() => {
    Appbar = require('../../src/react/appbar.jsx').Appbar;
  });


  // --------------------------------------------------------------------------
  // TEST APPBAR
  // --------------------------------------------------------------------------

  it('works', () => {
    assert.equal(true, true);
  });
});
