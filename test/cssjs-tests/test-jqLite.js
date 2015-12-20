/**
 * jqLite Tests
 * @module test/cssjs-tests/test-jqLite
 */


describe('js/lib/jqLite.js', () => {

  let assert = require('assert'),
      helpers = require('../lib/helpers.js'),
      jqLite;

  helpers.initDOM();

  before(() => {
    jqLite = require('../../src/js/lib/jqLite.js');
  });


  
  // --------------------------------------------------------------------------
  // CLASS METHODS
  // --------------------------------------------------------------------------

  describe('class methods', () => {
    let el;


    beforeEach(() => {
      el = document.createElement('div');
    });

    
    it('should add a class', () => {
      jqLite.addClass(el, 'my-class');
      assert.equal(jqLite.hasClass(el, 'my-class'), true);
    });


    it('should remove a class', () => {
      jqLite.addClass(el, 'my-class');
      jqLite.removeClass(el, 'my-class');
      assert.equal(jqLite.hasClass(el, 'my-class'), false);
    });


    it('should only add one class', () => {
      jqLite.addClass(el, 'my-class');
      jqLite.addClass(el, 'my-class');
      assert.equal(el.className, 'my-class');
    });


    it('should remove all classes', () => {
      el.className = 'my-class my-class';
      jqLite.removeClass(el, 'my-class');
      assert.equal(jqLite.hasClass(el, 'my-class'), false);
    });
  });

  

  // --------------------------------------------------------------------------
  // EVENT HANDLERS
  // --------------------------------------------------------------------------

  describe('event handlers', () => {
    let event, el;


    before(() => {
      event = require('synthetic-dom-events');
    });

    
    beforeEach(() => {
      el = document.createElement('button');
      document.body.appendChild(el);  // for IE10
    });


    afterEach(() => {
      el.parentNode.removeChild(el);
    });


    
    it('should attach a listener', () => {
      let isClicked = false;
      jqLite.on(el, 'click', () => {
        isClicked = true;
      });
      el.dispatchEvent(event('click'));
      assert.equal(isClicked, true);
    });


    it('should remove a listener', () => {
      let trigger1 = false,
          trigger2 = false;

      let fn1 = () => {trigger1 = true;};
      let fn2 = () => {trigger2 = true;};
      
      // add both
      jqLite.on(el, 'click', fn1);
      jqLite.on(el, 'click', fn2);
      
      // remove one
      jqLite.off(el, 'click', fn2);

      // trigger and check
      el.dispatchEvent(event('click'));
      assert.equal(trigger1, true);
      assert.equal(trigger2, false);
    });


    it('should remove all listeners', () => {
      let trigger1 = false,
          trigger2 = false;

      let fn1 = () => {trigger1 = true;};
      let fn2 = () => {trigger2 = true;};
      
      // add both
      jqLite.on(el, 'click', fn1);
      jqLite.on(el, 'click', fn2);
      
      // remove one
      jqLite.off(el, 'click');

      // trigger and check
      el.dispatchEvent(event('click'));
      assert.equal(trigger1, false);
      assert.equal(trigger2, false);
    });


    it('should only trigger once', () => {
      let t = 0,
          fn = () => {t += 1;};
      
      jqLite.one(el, 'click', fn);

      // trigger once
      el.dispatchEvent(event('click'));
      assert.equal(t, 1);

      // trigger again
      el.dispatchEvent(event('click'));
      assert.equal(t, 1);
    });
  });


  
  // --------------------------------------------------------------------------
  // CSS HELPER
  // --------------------------------------------------------------------------

  describe('css helpers', () => {
    let el;


    beforeEach(() => {
      el = document.createElement('button');
      document.body.appendChild(el);
    });


    afterEach(() => {
      el.parentNode.removeChild(el);
    });


    it('should set individual values', () => {
      jqLite.css(el, 'background-color', 'red');
      assert.equal(el.style.backgroundColor, 'red')
    });


    it('should set multiple values', () => {
      jqLite.css(el, {
        'background-color': 'red',
        'color': 'blue'
      });
      assert.equal(el.style.backgroundColor, 'red');
      assert.equal(el.style.color, 'blue');
    });


    it('should get individual classes', () => {
      jqLite.css(el, 'background-color', 'rgb(255, 0, 0)');
      assert.equal(jqLite.css(el, 'background-color'), 'rgb(255, 0, 0)');
    });

    // TODO: specify missing values API
  });



  // --------------------------------------------------------------------------
  // SCROLL METHODS
  // --------------------------------------------------------------------------
  describe('scroll methods', () => {
    let el;


    beforeEach(() => {
      el = document.createElement('div');
      document.body.appendChild(el);
    });
    

    afterEach(() => {
      el.parentNode.removeChild(el);
    });


    it('should set scroll position', () => {
      let innerEl = document.createElement('div');
      el.appendChild(innerEl);

      // add overflow
      jqLite.css(innerEl, {
        'height': '100px',
        'width': '100px',
        'background-color': 'red'
      });

      jqLite.css(el, {
        'height': '50px',
        'width': '50px',
        'overflow': 'auto'
      });

      // scroll
      jqLite.scrollTop(el, 25);
      assert.equal(jqLite.scrollTop(el), 25);

      jqLite.scrollLeft(el, 30);
      assert.equal(jqLite.scrollLeft(el), 30);
    });
  });
});
