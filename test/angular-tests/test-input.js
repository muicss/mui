/**
 * MUI test angular input module
 * @module test/angular-tests/test-input
 */

import assert from 'assert';

let helpers = require('./angular-helper'),
    ngModule = helpers.module,
    inject = helpers.inject,
    jqLite = helpers.jqLite,
    util = helpers.util;

require('../../src/angular/input.js');


describe('angular/input', function() {
  let $compile,
      $rootScope,
      scope;


  beforeEach(ngModule('mui.input'));


  beforeEach(inject(function(_$compile_, _$rootScope_) {
    // cache references
    $compile = _$compile_;
    $rootScope = _$rootScope_;

    // initialize scope for convenience
    scope = $rootScope.$new();
  }));


  afterEach(function() {
    scope.$destroy();
  });


  it('renders properly', function() {
    let s = '<mui-input ng-model="myModel"></mui-input>';
    let wrapperEl = $compile(s)(scope)[0];

    scope.$digest();

    // check wrapper <div>
    assert.equal(wrapperEl.tagName, 'DIV');
    assert.equal(jqLite.hasClass(wrapperEl, 'mui-textfield'), true);
    assert.equal(wrapperEl.children.length, 2);

    // check inner <input>
    let inputEl = wrapperEl.children[0];
    assert.equal(inputEl.tagName, 'INPUT');
    assert.equal(inputEl._muiTextfield, true);
    assert.equal(jqLite.hasClass(inputEl, 'mui--is-empty'), true);
    assert.equal(jqLite.hasClass(inputEl, 'mui--is-pristine'), true);
    assert.equal(jqLite.hasClass(inputEl, 'mui--is-untouched'), true);
    assert.equal(jqLite.hasClass(inputEl, 'mui--is-dirty'), false);
    assert.equal(jqLite.hasClass(inputEl, 'mui--is-touched'), false);
    assert.equal(jqLite.hasClass(inputEl, 'mui--is-not-empty'), false);

    // check label
    let labelEl = wrapperEl.children[1];
    assert.equal(labelEl.tagName, 'LABEL');
  });


  it('handles ng-model attribute properly', function() {
    let s, wrapperEl, inputEl;

    scope = $rootScope.$new();
    scope.myModel = 'myvalue';
    s = '<mui-input ng-model="myModel"></mui-input>';
    wrapperEl = $compile(s)(scope)[0];
    inputEl = wrapperEl.children[0];
    scope.$digest();

    // check initial value
    assert.equal(inputEl.value, 'myvalue');
  });


  it('attaches name attribute to inner input element', function() {
    let s = '<mui-input ng-model="myModel" name="myvar"></mui-input>';
    let inputEl = $compile(s)(scope)[0].children[0];

    scope.$digest();

    // check name attribute
    assert.equal(inputEl.hasAttribute('name'), true);
    assert.equal(inputEl.getAttribute('name'), 'myvar');
  });


  it('attaches ng-maxlength and ng-maxlength to inner element', function() {
    let s = '<mui-input ng-model="myModel" ' +
      'ng-maxlength="8" ng-minlength="2"></mui-input>';
    let inputEl = $compile(s)(scope)[0].children[0];

    scope.$digest();

    // check that attributes are added to inner element
    assert.equal(inputEl.getAttribute('ng-maxlength'), "8");
    assert.equal(inputEl.getAttribute('ng-minlength'), "2");
  });

  describe('empty/not-empty class handling', function() {
    let s, wrapperEl, inputEl;

    it('has class `mui--is-empty` on init when input empty', function() {
      scope = $rootScope.$new();
      s = '<mui-input ng-model="myModel"></mui-input>';
      wrapperEl = $compile(s)(scope)[0];
      inputEl = wrapperEl.children[0];
      scope.$digest();
      
      assert.equal(jqLite.hasClass(inputEl, 'mui--is-empty'), true);
      assert.equal(jqLite.hasClass(inputEl, 'mui--is-not-empty'), false);
    });


    it('has class `mui--is-not-empty` on init when input not empty', function() {
      scope = $rootScope.$new();
      scope.myModel = 'myvalue';
      s = '<mui-input ng-model="myModel"></mui-input>';
      wrapperEl = $compile(s)(scope)[0];
      inputEl = wrapperEl.children[0];
      scope.$digest();
      
      assert.equal(jqLite.hasClass(inputEl, 'mui--is-empty'), false);
      assert.equal(jqLite.hasClass(inputEl, 'mui--is-not-empty'), true);
    });


    it('modifies classes after after `input` event', function() {
      scope = $rootScope.$new();
      s = '<mui-input ng-model="myModel"></mui-input>';
      wrapperEl = $compile(s)(scope)[0];
      inputEl = wrapperEl.children[0];
      scope.$digest();
      
      // check classes
      assert.equal(jqLite.hasClass(inputEl, 'mui--is-empty'), true);
      assert.equal(jqLite.hasClass(inputEl, 'mui--is-not-empty'), false);

      // change value and trigger `input` event
      inputEl.value = 'myval';
      util.dispatchEvent(inputEl, 'input');
      
      // check classes
      assert.equal(jqLite.hasClass(inputEl, 'mui--is-empty'), false);
      assert.equal(jqLite.hasClass(inputEl, 'mui--is-not-empty'), true);
      
      // remove data and trigger `input` event
      inputEl.value = '';
      util.dispatchEvent(inputEl, 'input');
      
      // check classes
      assert.equal(jqLite.hasClass(inputEl, 'mui--is-empty'), true);
      assert.equal(jqLite.hasClass(inputEl, 'mui--is-not-empty'), false);
    });


    it('modifies classes after `change` event', function() {
      scope = $rootScope.$new();
      s = '<mui-input ng-model="myModel"></mui-input>';
      wrapperEl = $compile(s)(scope)[0];
      inputEl = wrapperEl.children[0];
      scope.$digest();
      
      // check classes
      assert.equal(jqLite.hasClass(inputEl, 'mui--is-empty'), true);
      assert.equal(jqLite.hasClass(inputEl, 'mui--is-not-empty'), false);

      // change value and trigger `change` event
      inputEl.value = 'myval';
      util.dispatchEvent(inputEl, 'change');
      
      // check classes
      assert.equal(jqLite.hasClass(inputEl, 'mui--is-empty'), false);
      assert.equal(jqLite.hasClass(inputEl, 'mui--is-not-empty'), true);
      
      // remove data and trigger `change` event
      inputEl.value = '';
      util.dispatchEvent(inputEl, 'change');
      
      // check classes
      assert.equal(jqLite.hasClass(inputEl, 'mui--is-empty'), true);
      assert.equal(jqLite.hasClass(inputEl, 'mui--is-not-empty'), false);
    });
  });


  describe('touched/untouched class handling', function() {
    let s, wrapperEl, inputEl;

    it('has class `mui--is-untouched` on init', function() {
      // initialize as empty
      scope = $rootScope.$new();
      s = '<mui-input ng-model="myModel"></mui-input>';
      wrapperEl = $compile(s)(scope)[0];
      inputEl = wrapperEl.children[0];
      scope.$digest();
      
      // check classes
      assert.equal(jqLite.hasClass(inputEl, 'mui--is-untouched'), true);
      assert.equal(jqLite.hasClass(inputEl, 'mui--is-touched'), false);

      // initialize as not empty
      scope = $rootScope.$new();
      scope.myModel = 'myvalue';
      s = '<mui-input ng-model="myModel"></mui-input>';
      wrapperEl = $compile(s)(scope)[0];
      inputEl = wrapperEl.children[0];
      scope.$digest();
      
      // check classes
      assert.equal(jqLite.hasClass(inputEl, 'mui--is-untouched'), true);
      assert.equal(jqLite.hasClass(inputEl, 'mui--is-touched'), false);
    });


    it('sets class to `mui--is-touched` on `blur` event', function() {
      scope = $rootScope.$new();
      s = '<mui-input ng-model="myModel"></mui-input>';
      wrapperEl = $compile(s)(scope)[0];
      inputEl = wrapperEl.children[0];
      scope.$digest();
      
      // blur event
      util.dispatchEvent(inputEl, 'blur');
      
      // check after
      assert.equal(jqLite.hasClass(inputEl, 'mui--is-untouched'), false);
      assert.equal(jqLite.hasClass(inputEl, 'mui--is-touched'), true);
    });
  });


  describe('pristine/dirty class handling', function() {
    let s, wrapperEl, inputEl;

    it('has class `mui--is-pristine` on init', function() {
      // empty
      scope = $rootScope.$new();
      s = '<mui-input ng-model="myModel"></mui-input>';
      wrapperEl = $compile(s)(scope)[0];
      inputEl = wrapperEl.children[0];
      scope.$digest();
      
      // check initial classes
      assert.equal(jqLite.hasClass(inputEl, 'mui--is-pristine'), true);
      assert.equal(jqLite.hasClass(inputEl, 'mui--is-dirty'), false);

      // not empty
      scope = $rootScope.$new();
      scope.myModel = 'myvalue';
      s = '<mui-input ng-model="myModel"></mui-input>';
      wrapperEl = $compile(s)(scope)[0];
      inputEl = wrapperEl.children[0];
      scope.$digest();
      
      // check initial classes
      assert.equal(jqLite.hasClass(inputEl, 'mui--is-pristine'), true);
      assert.equal(jqLite.hasClass(inputEl, 'mui--is-dirty'), false);      
    });


    it('sets class to `mui--is-dirty` on `change` event', function() {
      scope = $rootScope.$new();
      s = '<mui-input ng-model="myModel"></mui-input>';
      wrapperEl = $compile(s)(scope)[0];
      inputEl = wrapperEl.children[0];
      scope.$digest();
      
      // trigger change event
      util.dispatchEvent(inputEl, 'change');
      
      // check initial classes
      assert.equal(jqLite.hasClass(inputEl, 'mui--is-pristine'), false);
      assert.equal(jqLite.hasClass(inputEl, 'mui--is-dirty'), true);
    });


    it('sets class to `mui--is-dirty` on `input` event', function() {
      scope = $rootScope.$new();
      s = '<mui-input ng-model="myModel"></mui-input>';
      wrapperEl = $compile(s)(scope)[0];
      inputEl = wrapperEl.children[0];
      scope.$digest();
      
      // trigger change event
      util.dispatchEvent(inputEl, 'input');
      
      // check initial classes
      assert.equal(jqLite.hasClass(inputEl, 'mui--is-pristine'), false);
      assert.equal(jqLite.hasClass(inputEl, 'mui--is-dirty'), true);
    });
  });
});
