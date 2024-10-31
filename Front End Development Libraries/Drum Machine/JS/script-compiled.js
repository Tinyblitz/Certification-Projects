"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
var keys = {
  'Q': [{
    name: 'Heater 1',
    source: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-1.mp3"
  }, {
    name: 'Chord 1',
    source: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3"
  }],
  'W': [{
    name: 'Heater 2',
    source: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-2.mp3"
  }, {
    name: 'Chord 2',
    source: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3"
  }],
  'E': [{
    name: 'Heater 3',
    source: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-3.mp3"
  }, {
    name: 'Chord 3',
    source: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3"
  }],
  'A': [{
    name: 'Heater 4',
    source: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-4_1.mp3"
  }, {
    name: 'Shaker',
    source: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3"
  }],
  'S': [{
    name: 'Clap',
    source: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-6.mp3"
  }, {
    name: 'open HH',
    source: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3"
  }],
  'D': [{
    name: 'Open HH',
    source: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Dsc_Oh.mp3"
  }, {
    name: 'closed HH',
    source: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3"
  }],
  'Z': [{
    name: "Kick n' Hat",
    source: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Kick_n_Hat.mp3"
  }, {
    name: 'Punchy Kick',
    source: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3"
  }],
  'X': [{
    name: 'Kick',
    source: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/RP4_KICK_1.mp3"
  }, {
    name: 'Side Stick',
    source: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3"
  }],
  'C': [{
    name: 'Closed HH',
    source: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Cev_H2.mp3"
  }, {
    name: 'Snare',
    source: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3"
  }]
};

// Helper Functions
function playAudio(key) {
  var targetButton = document.getElementById('key');
}

///// Redux
// Actions
var DISPLAY = 'DISPLAY';
var POWER = 'POWER';
var BANK = 'BANK';
var updateDisplay = function updateDisplay(str) {
  return {
    type: DISPLAY,
    str: str
  };
};
var changePower = function changePower() {
  return {
    type: POWER
  };
};
var changeBank = function changeBank() {
  return {
    type: BANK
  };
};

// Reducers

var initialState = {
  powerOn: true,
  bankOn: false,
  message: ""
};
var reducer = function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  switch (action.type) {
    case DISPLAY:
      return _objectSpread(_objectSpread({}, state), {}, {
        message: action.str
      });
    case POWER:
      return _objectSpread(_objectSpread({}, state), {}, {
        powerOn: !state.powerOn
      });
    case BANK:
      return _objectSpread(_objectSpread({}, state), {}, {
        bankOn: !state.bankOn
      });
    default:
      return state;
  }
};
var store = Redux.createStore(reducer);
var Provider = ReactRedux.Provider;
var connect = ReactRedux.connect;

///// React
var Pad = /*#__PURE__*/function (_React$Component) {
  function Pad(props) {
    var _this;
    _classCallCheck(this, Pad);
    _this = _callSuper(this, Pad, [props]);
    _this.convertRegex = /\W+/g;
    _this.handleButton = _this.handleButton.bind(_this);
    _this.handleKey = _this.handleKey.bind(_this);
    return _this;
  }
  _inherits(Pad, _React$Component);
  return _createClass(Pad, [{
    key: "getID",
    value: function getID() {
      var arr = keys[this.props.text];
      var obj = this.props.bankOn ? arr[1] : arr[0];
      return obj.name;
    }
  }, {
    key: "handleButton",
    value: function handleButton() {
      var name = this.getID();
      var ID = name.replace(this.convertRegex, "-");
      var thisBtn = document.querySelector("#".concat(ID));
      thisBtn.classList.add('active');
      setTimeout(function () {
        thisBtn.classList.remove('active');
      }, 100);
      if (!this.props.powerOn) return;
      thisBtn.classList.add('lit');
      setTimeout(function () {
        thisBtn.classList.remove('lit');
      }, 100);
      this.props.updateNewDisplay(name);
      var thisAudio = document.querySelector("#".concat(this.props.text));
      thisAudio.currentTime = 0;
      thisAudio.play();
    }
  }, {
    key: "handleKey",
    value: function handleKey(event) {
      if (event.key.toUpperCase() === this.props.text) this.handleButton();
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      document.addEventListener('keyup', this.handleKey);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.removeEventListener('keyup', this.handleKey);
    }
  }, {
    key: "render",
    value: function render() {
      var arr = keys[this.props.text];
      var obj = this.props.bankOn ? arr[1] : arr[0];
      var regex = /\W+/g;
      var fixedID = obj.name.replace(regex, "-");
      return /*#__PURE__*/React.createElement("button", {
        id: fixedID,
        className: "drum-pad",
        type: "button",
        onClick: this.handleButton,
        tabindex: "0"
      }, this.props.text, /*#__PURE__*/React.createElement("audio", {
        id: this.props.text,
        className: "clip",
        src: obj.source
      }, "Your browser does not support the audio element."));
    }
  }]);
}(React.Component);
var DrumPads = /*#__PURE__*/function (_React$Component2) {
  function DrumPads(props) {
    _classCallCheck(this, DrumPads);
    return _callSuper(this, DrumPads, [props]);
  }
  _inherits(DrumPads, _React$Component2);
  return _createClass(DrumPads, [{
    key: "render",
    value: function render() {
      var _this2 = this;
      var pads = Object.keys(keys).map(function (key) {
        return /*#__PURE__*/React.createElement(Pad, _extends({
          text: key
        }, _this2.props));
      });
      return /*#__PURE__*/React.createElement("div", {
        id: "drum-pads"
      }, pads);
    }
  }]);
}(React.Component);
var Controller = /*#__PURE__*/function (_React$Component3) {
  function Controller(props) {
    var _this3;
    _classCallCheck(this, Controller);
    _this3 = _callSuper(this, Controller, [props]);
    _this3.changeBtnState = _this3.changeBtnState.bind(_this3);
    return _this3;
  }
  _inherits(Controller, _React$Component3);
  return _createClass(Controller, [{
    key: "changeBtnState",
    value: function changeBtnState() {
      var btnType = this.props.type.toLowerCase();
      if (btnType !== 'power' && !this.props.powerOn) return;
      btnType === 'power' ? this.props.turnOnOff() : this.props.switchBank();
      this.props.updateNewDisplay("");
    }
  }, {
    key: "render",
    value: function render() {
      var cType = this.props.type.toLowerCase();
      var isOn = cType === 'power' ? this.props.powerOn : this.props.bankOn;
      return /*#__PURE__*/React.createElement("div", {
        id: "".concat(cType, "-ctrl"),
        className: "controller"
      }, /*#__PURE__*/React.createElement("label", null, this.props.type), /*#__PURE__*/React.createElement("button", {
        id: "".concat(cType, "-btn"),
        className: "switch-btn",
        type: "button",
        onClick: this.changeBtnState,
        tabindex: "0"
      }, isOn ? /*#__PURE__*/React.createElement("div", {
        className: "switch-side"
      }) : /*#__PURE__*/React.createElement("div", {
        className: "switch-side active"
      }), isOn ? /*#__PURE__*/React.createElement("div", {
        className: "switch-side active"
      }) : /*#__PURE__*/React.createElement("div", {
        className: "switch-side"
      })));
    }
  }]);
}(React.Component);
var ControlArea = /*#__PURE__*/function (_React$Component4) {
  function ControlArea(props) {
    var _this4;
    _classCallCheck(this, ControlArea);
    _this4 = _callSuper(this, ControlArea, [props]);
    _this4.state = {
      vol: 30
    };
    _this4.updateVolume = _this4.updateVolume.bind(_this4);
    return _this4;
  }
  _inherits(ControlArea, _React$Component4);
  return _createClass(ControlArea, [{
    key: "updateVolume",
    value: function updateVolume(event) {
      var _this5 = this;
      if (!this.props.powerOn) return;
      this.setState(function (state) {
        return {
          vol: event.target.value
        };
      }, function () {
        var audioVolume = _this5.state.vol / 100;
        document.querySelectorAll('.clip').forEach(function (el) {
          return el.volume = audioVolume;
        });
        _this5.props.updateNewDisplay("Volume: " + _this5.state.vol);
        setTimeout(function () {
          return _this5.props.updateNewDisplay("");
        }, 1650);
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this6 = this;
      document.querySelectorAll('.clip').forEach(function (el) {
        return el.volume = _this6.state.vol / 100;
      });
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("div", {
        id: "control-area"
      }, /*#__PURE__*/React.createElement(Controller, _extends({
        type: "Power"
      }, this.props)), /*#__PURE__*/React.createElement("div", {
        id: "display"
      }, /*#__PURE__*/React.createElement("span", {
        id: "output"
      }, this.props.message)), /*#__PURE__*/React.createElement("input", {
        type: "range",
        min: "0",
        max: "100",
        value: this.state.vol,
        id: "vol-ctrl",
        className: "slider",
        onChange: this.updateVolume
      }), /*#__PURE__*/React.createElement(Controller, _extends({
        type: "Bank"
      }, this.props)));
    }
  }]);
}(React.Component);
var DrumMachine = /*#__PURE__*/function (_React$Component5) {
  function DrumMachine(props) {
    _classCallCheck(this, DrumMachine);
    return _callSuper(this, DrumMachine, [props]);
  }
  _inherits(DrumMachine, _React$Component5);
  return _createClass(DrumMachine, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("div", {
        id: "drum-machine"
      }, /*#__PURE__*/React.createElement(DrumPads, this.props), /*#__PURE__*/React.createElement(ControlArea, this.props));
    }
  }]);
}(React.Component); ///// React-Redux
var mapStateToProps = function mapStateToProps(state) {
  return _objectSpread({}, state);
};
var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    updateNewDisplay: function updateNewDisplay(str) {
      return dispatch(updateDisplay(str));
    },
    turnOnOff: function turnOnOff() {
      return dispatch(changePower());
    },
    switchBank: function switchBank() {
      return dispatch(changeBank());
    }
  };
};
var Container = connect(mapStateToProps, mapDispatchToProps)(DrumMachine);
var APP = /*#__PURE__*/function (_React$Component6) {
  function APP() {
    _classCallCheck(this, APP);
    return _callSuper(this, APP, arguments);
  }
  _inherits(APP, _React$Component6);
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
