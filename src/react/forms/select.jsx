/**
 * MUI React select module
 * @module react/forms/select
 */

'use strict';

var jqLite = require('../../js/lib/jqlite.js'),
    util = require('../../js/lib/util.js'),
    PropTypes = React.PropTypes,
    wrapperPadding = 15,  // from CSS
    inputHeight = 32,  // from CSS
    optionHeight = 42,  // from CSS
    menuPadding = 8,  // from CSS
    doc = document,
    win = window;


/**
 * Select constructor
 * @class
 */
var Select = React.createClass({
  propTypes: {
    name: PropTypes.string,
    isAutofocus: PropTypes.bool,
    isDisabled: PropTypes.bool,
    isMultiple: PropTypes.bool,
    isRequired: PropTypes.bool,
    useDefault: PropTypes.bool,
    onChange: PropTypes.func
  },
  getDefaultProps: function() {
    return {
      name: null,
      isAutofocus: false,
      isDisabled: false,
      isMultiple: false,
      isRequired: false,
      useDefault: false,
      onChange: null
    };
  },
  getInitialState: function() {
    return {
      showMenu: false
    };
  },
  componentDidMount: function() {
    // make wrapper element focusable
    this.refs.wrapperEl.tabIndex = -1;
  },
  onMousedown: function(ev) {
    if (ev.button !== 0 || this.props.useDefault === true) return;
    ev.preventDefault();
  },
  onClick: function(ev) {
    if (ev.button !== 0) return;  // only left clicks
    this.showMenu();
  },
  onFocus: function(ev) {
    // check flag
    if (this.props.useDefault === true) return;

    // attach keydown handler
    jqLite.on(doc, 'keydown', this.onKeydown);
  },
  onBlur: function(ev) {
    // remove keydown handler
    jqLite.off(doc, 'keydown', this.onKeydown);
  },
  onKeydown: function(ev) {
    // spacebar, down, up
    if (ev.keyCode === 32 || ev.keyCode === 38 || ev.keyCode === 40) {
      // prevent win scroll
      ev.preventDefault();

      if (this.refs.selectEl.disabled !== true) this.showMenu();
    }
  },
  showMenu: function() {
    // add event listeners
    jqLite.on(win, 'resize', this.hideMenu);
    jqLite.on(doc, 'click', this.hideMenu);

    // re-draw
    this.setState({showMenu: true});
  },
  hideMenu: function() {
    // remove event listeners
    jqLite.off(win, 'resize', this.hideMenu);
    jqLite.off(doc, 'click', this.hideMenu);
    
    // re-draw
    this.setState({showMenu: false});
  },
  render: function() {
    var menuElem;

    if (this.state.showMenu) {
      menuElem = (
        <Menu
          selectEl={ this.refs.selectEl }
          wrapperEl={ this.refs.wrapperEl }
          teardownFn={ this.hideMenu }
        />
      );
    }

    return (
      <div
        ref="wrapperEl"
        className="mui-select"
      >
        <select
          ref="selectEl"
          name={ this.props.name }
          autofocus={ this.props.isAutofocus }
          disabled={ this.props.isDisabled }
          multiple={ this.props.isMultiple }
          required={ this.props.isRequired }
          onMouseDown={ this.onMousedown }
          onClick={ this.onClick }
          onFocus={ this.onFocus }
          onBlur={ this.onBlur }
        >
          { this.props.children }
        </select>
        { menuElem }
      </div>
    );
  }
});


/**
 * SelectItem constructor
 * @class
 */
var SelectItem = React.createClass({
  propTypes: {
    value: PropTypes.string,
    label: PropTypes.string
  },
  getDefaultProps: function() {
    return {
      value: null,
      label: null
    };
  },
  render: function() {
    return (
      <option value={ this.props.value }>
        { this.props.label }
      </option>
    );
  }
});


/**
 * Menu constructor
 * @class
 */
var Menu = React.createClass({
  getDefaultProps: function() {
    return {
      selectEl: null,
      wrapperEl: null,
      teardownFn: null
    };
  },
  getInitialState: function() {
    return {
      origIndex: null,
      currentIndex: null
    };
  },
  componentWillMount: function() {
    var optionList = this.props.selectEl.children,
        m = optionList.length,
        selectedPos = 0,
        i;

    // get current selected position
    for (i=m - 1; i > -1; i--) if (optionList[i].selected) selectedPos = i;
    this.setState({origIndex: selectedPos, currentIndex: selectedPos});

    // blur active element (IE10 bugfix)
    setTimeout(function() {
      if (doc.activeElement.nodeName.toLowerCase() !== 'body') {
        doc.activeElement.blur();
      }
    }, 0);
  },
  componentDidMount: function() {
    // set position
    var cssProps = getMenuPositionalCSS(
      this.props.wrapperEl,
      this.props.selectEl.children.length,
      this.state.currentIndex
    );

    jqLite.css(ReactDOM.findDOMNode(this), cssProps);

    // attach keydown handler
    jqLite.on(doc, 'keydown', this.onKeydown);
  },
  componentWillUnmount: function() {
    // remove keydown handler
    jqLite.off(doc, 'keydown', this.onKeydown);
  },
  onClick: function(pos, ev) {
    // don't allow events to bubble
    ev.stopPropagation();
    
    // select option
    this.selectCurrent(pos);

    // destroy menu
    this.destroy();
  },
  onKeydown: function(ev) {
    var keyCode = ev.keyCode;

    // tab
    if (keyCode === 9) return this.destroy();

    // escape | up | down | enter
    if (keyCode === 27 || keyCode === 40 || keyCode === 38 || keyCode === 13) {
      ev.preventDefault();
    }

    if (keyCode === 27) {
      this.destroy();
    } else if (keyCode === 40) {
      this.increment();
    } else if (keyCode === 38) {
      this.decrement();
    } else if (keyCode === 13) {
      this.selectCurrent();
      this.destroy();
    }
  },
  increment: function() {
    if (this.state.currentIndex === this.props.selectEl.children.length - 1) {
      return;
    }

    this.setState({currentIndex: this.state.currentIndex + 1});
  },
  decrement: function() {
    if (this.state.currentIndex === 0) return;
    this.setState({currentIndex: this.state.currentIndex - 1});
  },
  selectCurrent: function(pos) {
    var state = this.state,
        currentIndex = (pos === undefined) ? state.currentIndex : pos;
    
    if (currentIndex !== state.origIndex) {
      var optionEls = this.props.selectEl.children;
      optionEls[state.origIndex].selected = false;
      optionEls[currentIndex].selected = true;
    }
  },
  destroy: function() {
    this.props.teardownFn();
  },
  render: function() {
    var menuItems = [],
        optionList = this.props.selectEl.children,
        m = optionList.length,
        cls,
        i;

    // define menu items
    for (i=0; i < m; i++) {
      cls = (i === this.state.currentIndex) ? 'mui--is-selected' : '';

      menuItems.push(
        <div
          key={ i }
          className={ cls }
          onClick={ this.onClick.bind(null, i) }
        >
          { optionList[i].textContent }
        </div>
      );
    }

    return (
      <div className="mui-select__menu">
        { menuItems }  
      </div>
    );
  }
});


/**
 * Menu position/size/scroll helper.
 * @function
 * @returns {Object} Object with keys 'height', 'top', 'scrollTop'
 */
function getMenuPositionalCSS(wrapperEl, numOptions, currentIndex) {
  var viewHeight = doc.documentElement.clientHeight;

  // determine 'height'
  var h = numOptions * optionHeight + 2 * menuPadding,
      height = Math.min(h, viewHeight);

  // determine 'top'
  var top, initTop, minTop, maxTop;

  initTop = (menuPadding + optionHeight) - (wrapperPadding + inputHeight);
  initTop -= currentIndex * optionHeight;

  minTop = -1 * wrapperEl.getBoundingClientRect().top;
  maxTop = (viewHeight - height) + minTop;

  top = Math.min(Math.max(initTop, minTop), maxTop);

  // determine 'scrollTop'
  var scrollTop = 0,
      scrollIdeal,
      scrollMax;

  if (h > viewHeight) {
    scrollIdeal = (menuPadding + (currentIndex + 1) * optionHeight) -
      (-1 * top + wrapperPadding + inputHeight);
    scrollMax = numOptions * optionHeight + 2 * menuPadding - height;
    scrollTop = Math.min(scrollIdeal, scrollMax);
  }

  return {
    'height': height + 'px',
    'top': top + 'px',
    'scrollTop': scrollTop + 'px'
  };
}


/** Define module API */
module.exports = {
  Select: Select,
  SelectItem: SelectItem
};
