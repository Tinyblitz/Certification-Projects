"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// Variables

var btnTypes = [{
  id: 'clear',
  text: 'AC',
  "class": 'long'
}, {
  id: 'divide',
  text: '/',
  "class": 'oprtn'
}, {
  id: 'multiply',
  text: 'x',
  "class": 'oprtn'
}, {
  id: 'seven',
  text: '7',
  "class": 'num'
}, {
  id: 'eight',
  text: '8',
  "class": 'num'
}, {
  id: 'nine',
  text: '9',
  "class": 'num'
}, {
  id: 'subtract',
  text: '-',
  "class": 'oprtn'
}, {
  id: 'four',
  text: '4',
  "class": 'num'
}, {
  id: 'five',
  text: '5',
  "class": 'num'
}, {
  id: 'six',
  text: '6',
  "class": 'num'
}, {
  id: 'add',
  text: '+',
  "class": 'oprtn'
}, {
  id: 'one',
  text: '1',
  "class": 'num'
}, {
  id: 'two',
  text: '2',
  "class": 'num'
}, {
  id: 'three',
  text: '3',
  "class": 'num'
}, {
  id: 'equals',
  text: '=',
  "class": 'tall'
}, {
  id: 'zero',
  text: '0',
  "class": 'long num'
}, {
  id: 'decimal',
  text: '.',
  "class": 'num'
}];

///// Redux

// actions

var OPERATION = 'OPERATION',
  CALCULATE = 'CALCULATE',
  CUT = 'CUT',
  RESET = 'RESET',
  CLEAR = 'CLEAR';
var addOperation = function addOperation(_char) {
  return {
    type: OPERATION,
    "char": _char
  };
};
var submitCalculation = function submitCalculation(number) {
  return {
    type: CALCULATE,
    number: number
  };
};
var cutFormula = function cutFormula(start, end) {
  return {
    type: CUT,
    start: start,
    end: end
  };
};
var resetInput = function resetInput() {
  return {
    type: RESET
  };
};
var makeClear = function makeClear() {
  return {
    type: CLEAR
  };
};
var baseState = {
  formula: "",
  display: '0',
  isCalculated: false
};
var reducer = function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : baseState;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  switch (action.type) {
    case OPERATION:
      return {
        formula: state.formula.concat(action["char"]),
        display: state.display.concat(action["char"]),
        isCalculated: false
      };
    case CALCULATE:
      return {
        formula: state.formula.concat("=".concat(action.number)),
        display: action.number,
        isCalculated: true
      };
    case CUT:
      return _objectSpread(_objectSpread({}, state), {}, {
        formula: state.formula.slice(action.start, action.end)
      });
    case RESET:
      return _objectSpread(_objectSpread({}, state), {}, {
        display: ''
      });
    case CLEAR:
      return baseState;
    default:
      return state;
  }
};
var store = Redux.createStore(reducer);

///// React
var Display = /*#__PURE__*/function (_React$Component) {
  function Display(props) {
    _classCallCheck(this, Display);
    return _callSuper(this, Display, [props]);
  }
  _inherits(Display, _React$Component);
  return _createClass(Display, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("div", {
        id: "output"
      }, /*#__PURE__*/React.createElement("div", {
        id: "calculation"
      }, this.props.formula), /*#__PURE__*/React.createElement("div", {
        id: "display"
      }, this.props.display));
    }
  }]);
}(React.Component);
var digitLimitOn = false;
var Btn = /*#__PURE__*/function (_React$Component2) {
  function Btn(props) {
    var _this;
    _classCallCheck(this, Btn);
    _this = _callSuper(this, Btn, [props]);
    _this.handleBtn = _this.handleBtn.bind(_this);
    return _this;
  }
  _inherits(Btn, _React$Component2);
  return _createClass(Btn, [{
    key: "calculate",
    value: function calculate(str) {
      var MDRegex = /-?\d+(?:\.\d+)?(⋅|\/)-?\d+(?:\.\d+)?/;
      var ASRegex = /-?\d+(?:\.\d+)?(\+|\-)-?\d+(?:\.\d+)?/;
      var resultStr = str;

      // Deal with multiplication and division first
      do {
        resultStr = resultStr.replace(MDRegex, function (match, opr) {
          var _match$split$map = match.split(opr).map(Number),
            _match$split$map2 = _slicedToArray(_match$split$map, 2),
            a = _match$split$map2[0],
            b = _match$split$map2[1];
          return opr === '⋅' ? a * b : a / b;
        });
      } while (MDRegex.test(resultStr));

      // Then deal with addition and subtraction
      do {
        resultStr = resultStr.replace(ASRegex, function (match, opr) {
          var _match$split$map3 = match.split(opr).map(Number),
            _match$split$map4 = _slicedToArray(_match$split$map3, 2),
            a = _match$split$map4[0],
            b = _match$split$map4[1];
          return opr === '+' ? a + b : a - b;
        });
      } while (ASRegex.test(resultStr));
      if (resultStr.slice(-1) === '.') resultStr = resultStr.slice(0, -1);
      var numResult = Number(resultStr);
      if (!isNaN(numResult)) {
        // Check if numResult is a valid number
        // If the number has a decimal point, check its decimal places
        if (resultStr.includes('.')) {
          var decimalPart = resultStr.split('.')[1];
          if (decimalPart.length > 6) {
            resultStr = numResult.toFixed(6); // Round to 6 decimal places
          }
        } else if (resultStr.length > 10) {
          resultStr = numResult.toExponential(5); // Convert to scientific notation
        }
      }
      return resultStr;
    }
  }, {
    key: "handleBtn",
    value: function handleBtn() {
      var _this2 = this;
      var text = this.props.text === 'x' ? '⋅' : this.props.text;
      var numRegex = /^-|(?:-?\d+(?:\.\d*)?)$/;
      var oprtnRegex = /^⋅|\/|\+|-$/;
      var eqnRegex = /^[^=]*=/;
      var trimDecimal = function trimDecimal() {
        if (_this2.props.formula.slice(-1) === '.') _this2.props.changeFormula(0, -1);
      };
      var match = this.props.formula.match(/\d+(?:\.\d*)?$/);
      var mostRecentNumber = match ? match : null;
      switch (this.props.id) {
        case 'clear':
          this.props.pressClear();
          break;
        case 'equals':
          trimDecimal();
          var result = this.calculate(this.props.formula);
          this.props.passResult(result);
          break;
        case 'decimal':
          if (this.props.display.includes('.')) break;
          if (this.props.display === '0' || oprtnRegex.test(this.props.display)) {
            var check = oprtnRegex.test(this.props.formula.slice(-2, -1));
            if (!check && this.props.formula !== "-") this.props.confirmNumber();
            this.props.sendInput('0');
          }
          this.props.sendInput(text);
          break;
        case 'subtract':
          trimDecimal();
          if (this.props.formula.slice(-1) === '-') this.props.changeFormula(0, -1);
          this.props.confirmNumber();
          this.props.sendInput(text);
          break;
        case 'add':
        case 'divide':
        case 'multiply':
          trimDecimal();
          if (this.props.formula === '') {
            this.props.sendInput('0');
          }
          if (oprtnRegex.test(this.props.formula.slice(-1))) {
            if (this.props.formula.slice(-1) === '-' && oprtnRegex.test(this.props.formula.slice(-2, -1))) this.props.changeFormula(0, -2);else this.props.changeFormula(0, -1);
          }
          if (this.props.isCalculated) {
            var _result = this.props.formula.replace(eqnRegex, '');
            var cutOff = this.props.formula.length - _result.length;
            this.props.changeFormula(cutOff, this.props.formula.length);
          }
          this.props.confirmNumber();
          this.props.sendInput(text);
          break;
        default:
          if (this.props.display.length + 1 > 14) {
            if (digitLimitOn) break;
            var hold = this.props.display;
            var indx = this.props.formula.length;
            this.props.confirmNumber();
            this.props.sendInput('Digit Limit Met');
            this.props.changeFormula(0, indx);
            setTimeout(function () {
              _this2.props.confirmNumber();
              _this2.props.sendInput(hold);
              _this2.props.changeFormula(0, indx);
              digitLimitOn = false;
            }, 3000);
            digitLimitOn = true;
            break;
          }
          if (this.props.isCalculated) {
            this.props.pressClear();
            this.props.confirmNumber();
          }
          if (this.props.display === '0' || oprtnRegex.test(this.props.display)) {
            var _check = oprtnRegex.test(this.props.formula.slice(-2, -1));
            if (!_check && this.props.formula !== "-") this.props.confirmNumber();
          }
          this.props.sendInput(text);
          break;
      }
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("button", {
        id: this.props.id,
        "class": "btn ".concat(this.props["class"]),
        type: "button",
        onClick: this.handleBtn
      }, this.props.text);
    }
  }]);
}(React.Component);
var Keypad = /*#__PURE__*/function (_React$Component3) {
  function Keypad(props) {
    _classCallCheck(this, Keypad);
    return _callSuper(this, Keypad, [props]);
  }
  _inherits(Keypad, _React$Component3);
  return _createClass(Keypad, [{
    key: "render",
    value: function render() {
      var _this3 = this;
      var listBtns = btnTypes.map(function (btn) {
        return /*#__PURE__*/React.createElement(Btn, _extends({}, btn, _this3.props));
      });
      return /*#__PURE__*/React.createElement("div", {
        id: "keypad"
      }, listBtns);
    }
  }]);
}(React.Component);
var Calculator = /*#__PURE__*/function (_React$Component4) {
  function Calculator(props) {
    _classCallCheck(this, Calculator);
    return _callSuper(this, Calculator, [props]);
  }
  _inherits(Calculator, _React$Component4);
  return _createClass(Calculator, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("div", {
        id: "calculator"
      }, /*#__PURE__*/React.createElement(Display, this.props), /*#__PURE__*/React.createElement(Keypad, this.props));
    }
  }]);
}(React.Component); ///// React-Redux
var Provider = ReactRedux.Provider;
var connect = ReactRedux.connect;
var mapStateToProps = function mapStateToProps(state) {
  return _objectSpread({}, state);
};
var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    sendInput: function sendInput(_char2) {
      return dispatch(addOperation(_char2));
    },
    passResult: function passResult(num) {
      return dispatch(submitCalculation(num));
    },
    changeFormula: function changeFormula(start, end) {
      return dispatch(cutFormula(start, end));
    },
    confirmNumber: function confirmNumber() {
      return dispatch(resetInput());
    },
    pressClear: function pressClear() {
      return dispatch(makeClear());
    }
  };
};
var Container = connect(mapStateToProps, mapDispatchToProps)(Calculator);
var APP = /*#__PURE__*/function (_React$Component5) {
  function APP() {
    _classCallCheck(this, APP);
    return _callSuper(this, APP, arguments);
  }
  _inherits(APP, _React$Component5);
  return _createClass(APP, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement(Provider, {
        store: store
      }, /*#__PURE__*/React.createElement(Container, null));
    }
  }]);
}(React.Component);
var root = ReactDOM.createRoot(document.querySelector('main'));
root.render(/*#__PURE__*/React.createElement(APP, null));
