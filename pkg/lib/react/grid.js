/**
 * MUI React grid module
 * @module react/grid
 */

'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Col = exports.Row = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _util = require('../js/lib/util');

var util = _interopRequireWildcard(_util);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var breakpoints = ['xs', 'sm', 'md', 'lg'];

/**
 * Row constructor
 * @class
 */

var Row = (function (_React$Component) {
  _inherits(Row, _React$Component);

  function Row() {
    _classCallCheck(this, Row);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Row).apply(this, arguments));
  }

  _createClass(Row, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'mui-row' },
        this.props.children
      );
    }
  }]);

  return Row;
})(_react2.default.Component);

/**
 * Col constructor
 * @class
 */

var Col = (function (_React$Component2) {
  _inherits(Col, _React$Component2);

  function Col() {
    _classCallCheck(this, Col);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Col).apply(this, arguments));
  }

  _createClass(Col, [{
    key: 'defaultProps',
    value: function defaultProps() {
      var props = {},
          i = undefined,
          v = undefined;

      // add {breakpoint}, {breakpoint}-offset to props
      for (i = breakpoints.length - 1; i > -1; i--) {
        v = breakpoints[i];
        props[v] = null;
        props[v + '-offset'] = null;
      }

      return props;
    }
  }, {
    key: 'render',
    value: function render() {
      var cls = {},
          i = undefined,
          bk = undefined,
          val = undefined,
          baseCls = undefined;

      // add mui-col classes
      for (i = breakpoints.length - 1; i > -1; i--) {
        bk = breakpoints[i];
        baseCls = 'mui-col-' + bk;

        // add mui-col-{bk}-{val}
        val = this.props[bk];
        if (val) cls[baseCls + '-' + val] = true;

        // add mui-col-{bk}-offset-{val}
        val = this.props[bk + '-offset'];
        if (val) cls[baseCls + '-offset-' + val] = true;
      }

      cls = util.classNames(cls);

      return _react2.default.createElement(
        'div',
        { className: cls },
        this.props.children
      );
    }
  }]);

  return Col;
})(_react2.default.Component);

/** Define module API */

exports.Row = Row;
exports.Col = Col;