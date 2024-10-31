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
var minMinutes = 1,
  maxMinutes = 60;

// Redux variables
var UPDATEBREAK = 'UPDATEBREAK',
  UPDATESESSION = 'UPDATESESSION';
var UPDATETIMER = 'UPDATETIMER',
  SWITCH = 'SWITCH',
  ONOFF = 'ONOFF',
  RESET = 'RESET';
var initialBreakLength = 5;
var initialSessionLength = 25;
var adjustBaseState = {
  breakLength: initialBreakLength,
  sessionLength: initialSessionLength
};
var timerBaseState = {
  countdown: initialSessionLength * 60,
  onBreak: false,
  isRunning: false
};

///// Redux

// Actions

var updateBreakLength = function updateBreakLength(value) {
  return {
    type: UPDATEBREAK,
    value: value
  };
};
var updateSessionLength = function updateSessionLength(value) {
  return {
    type: UPDATESESSION,
    value: value
  };
};
var updateTimer = function updateTimer(value) {
  return {
    type: UPDATETIMER,
    value: value
  };
};
var changeActive = function changeActive() {
  return {
    type: ONOFF
  };
};
var switchSection = function switchSection() {
  return {
    type: SWITCH
  };
};
var resetClock = function resetClock() {
  return {
    type: RESET
  };
};

// Reducers

var adjustmentReducer = function adjustmentReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : adjustBaseState;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  switch (action.type) {
    case UPDATEBREAK:
      return _objectSpread(_objectSpread({}, state), {}, {
        breakLength: action.value
      });
    case UPDATESESSION:
      return _objectSpread(_objectSpread({}, state), {}, {
        sessionLength: action.value
      });
    case RESET:
      return adjustBaseState;
    default:
      return state;
  }
};
var timerReducer = function timerReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : timerBaseState;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  switch (action.type) {
    case UPDATETIMER:
      return _objectSpread(_objectSpread({}, state), {}, {
        countdown: action.value
      });
    case ONOFF:
      return _objectSpread(_objectSpread({}, state), {}, {
        isRunning: !state.isRunning
      });
    case SWITCH:
      return _objectSpread(_objectSpread({}, state), {}, {
        onBreak: !state.onBreak
      });
    case RESET:
      return timerBaseState;
    default:
      return state;
  }
};
var reducer = Redux.combineReducers({
  timer: timerReducer,
  adjuster: adjustmentReducer
});
var store = Redux.createStore(reducer);

///// React
var Adjustment = /*#__PURE__*/function (_React$Component) {
  function Adjustment(props) {
    var _this;
    _classCallCheck(this, Adjustment);
    _this = _callSuper(this, Adjustment, [props]);
    _this.updateCountdown = _this.updateCountdown.bind(_this);
    _this.changeLength = _this.changeLength.bind(_this);
    _this.handleIncrement = _this.handleIncrement.bind(_this);
    _this.handleDecrement = _this.handleDecrement.bind(_this);
    return _this;
  }
  _inherits(Adjustment, _React$Component);
  return _createClass(Adjustment, [{
    key: "updateCountdown",
    value: function updateCountdown(val) {
      this.props.sendNewTime(val);
    }
  }, {
    key: "changeLength",
    value: function changeLength(val) {
      if (this.props.timer.isRunning) return;
      var ID = this.props.name.toLowerCase();
      var tLength = ID === 'break' ? this.props.adjuster.breakLength : this.props.adjuster.sessionLength;
      var isBreak = ID === 'break';
      var isSession = ID === 'session';
      var limitCheck = val > 0 ? tLength + val > maxMinutes : tLength + val < minMinutes;
      if (limitCheck) return;
      if (isBreak) this.props.sendNewBreak(tLength + val);
      if (isSession) this.props.sendNewSession(tLength + val);
      var breakCheck = this.props.timer.onBreak && isBreak;
      var sessionCheck = !this.props.timer.onBreak && isSession;
      if (breakCheck || sessionCheck) this.props.sendNewTime((tLength + val) * 60);
    }
  }, {
    key: "handleIncrement",
    value: function handleIncrement() {
      this.changeLength(1);
    }
  }, {
    key: "handleDecrement",
    value: function handleDecrement() {
      this.changeLength(-1);
    }
  }, {
    key: "render",
    value: function render() {
      var ID = this.props.name.toLowerCase();
      return /*#__PURE__*/React.createElement("div", {
        id: "".concat(ID, "-container")
      }, /*#__PURE__*/React.createElement("label", {
        id: "".concat(ID, "-label"),
        className: "adjust-label"
      }, this.props.name, " Length"), /*#__PURE__*/React.createElement("div", {
        className: "adjustments"
      }, /*#__PURE__*/React.createElement("i", {
        id: "".concat(ID, "-decrement"),
        className: "fa-solid fa-angle-down",
        onClick: this.handleDecrement
      }), /*#__PURE__*/React.createElement("span", {
        id: "".concat(ID, "-length")
      }, ID === 'break' ? this.props.adjuster.breakLength : this.props.adjuster.sessionLength), /*#__PURE__*/React.createElement("i", {
        id: "".concat(ID, "-increment"),
        className: "fa-solid fa-angle-up",
        onClick: this.handleIncrement
      })));
    }
  }]);
}(React.Component);
var Settings = /*#__PURE__*/function (_React$Component2) {
  function Settings(props) {
    _classCallCheck(this, Settings);
    return _callSuper(this, Settings, [props]);
  }
  _inherits(Settings, _React$Component2);
  return _createClass(Settings, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("div", {
        id: "settings"
      }, /*#__PURE__*/React.createElement(Adjustment, _extends({
        name: "Break"
      }, this.props)), /*#__PURE__*/React.createElement(Adjustment, _extends({
        name: "Session"
      }, this.props)));
    }
  }]);
}(React.Component);
var Timer = /*#__PURE__*/function (_React$Component3) {
  function Timer(props) {
    var _this2;
    _classCallCheck(this, Timer);
    _this2 = _callSuper(this, Timer, [props]);
    _this2.countdown;
    _this2.changeOver;
    _this2.handleTimer = _this2.handleTimer.bind(_this2);
    _this2.handleReset = _this2.handleReset.bind(_this2);
    return _this2;
  }

  //   sendNewTime
  // turnONOFF
  // setSection
  _inherits(Timer, _React$Component3);
  return _createClass(Timer, [{
    key: "handleTimer",
    value: function handleTimer() {
      var _this3 = this;
      var playBtn = document.querySelector('#play-btn');
      var pauseBtn = document.querySelector('#pause-btn');
      var timerDiv = document.querySelector('#timer-container');
      var audioPlayer = document.querySelector('#beep');
      if (this.props.timer.isRunning) {
        clearInterval(this.countdown);
        playBtn.classList.remove('on');
        pauseBtn.classList.add('on');
      } else {
        this.countdown = setInterval(function () {
          var newTime = _this3.props.timer.countdown - 1;
          if (newTime === 59) {
            timerDiv.classList.add('low');
          } else if (newTime === 0) {
            audioPlayer.play();
            _this3.changeOver = setTimeout(function () {
              var setTime = (_this3.props.timer.onBreak ? _this3.props.adjuster.sessionLength : _this3.props.adjuster.breakLength) * 60;
              _this3.props.sendNewTime(setTime);
              _this3.props.updateSection();
              timerDiv.classList.remove('low');
            }, 4000);
          } else if (newTime < 0) newTime = 0;
          _this3.props.sendNewTime(newTime);
        }, 1000);
        playBtn.classList.add('on');
        pauseBtn.classList.remove('on');
      }
      this.props.turnONOFF();
    }
  }, {
    key: "handleReset",
    value: function handleReset() {
      document.querySelector('#play-btn').classList.remove('on');
      document.querySelector('#pause-btn').classList.add('on');
      document.querySelector('#timer-container').classList.remove('low');
      clearInterval(this.countdown);
      clearTimeout(this.changeOver);
      var audioPlayer = document.querySelector('#beep');
      audioPlayer.pause();
      audioPlayer.currentTime = 0;
      this.props.returnToStart();
    }
  }, {
    key: "render",
    value: function render() {
      var minutes = Math.floor(this.props.timer.countdown / 60);
      var seconds = this.props.timer.countdown % 60;
      var formattedTime = "".concat(minutes < 10 ? '0' : '').concat(minutes, ":").concat(seconds < 10 ? '0' : '').concat(seconds);
      return /*#__PURE__*/React.createElement("div", {
        id: "clock-container"
      }, /*#__PURE__*/React.createElement("div", {
        id: "timer-container"
      }, /*#__PURE__*/React.createElement("label", {
        id: "timer-label"
      }, this.props.timer.onBreak ? "Break" : "Session"), /*#__PURE__*/React.createElement("p", {
        id: "time-left"
      }, formattedTime)), /*#__PURE__*/React.createElement("div", {
        id: "timer-controls"
      }, /*#__PURE__*/React.createElement("button", {
        id: "start_stop",
        onClick: this.handleTimer
      }, /*#__PURE__*/React.createElement("i", {
        id: "play-btn",
        className: "fa fa-play"
      }), /*#__PURE__*/React.createElement("i", {
        id: "pause-btn",
        className: "fa fa-pause on"
      })), /*#__PURE__*/React.createElement("button", {
        id: "reset",
        onClick: this.handleReset
      }, /*#__PURE__*/React.createElement("i", {
        id: "reset-btn",
        className: "fa fa-rotate"
      }))));
    }
  }]);
}(React.Component);
var Clock = /*#__PURE__*/function (_React$Component4) {
  function Clock(props) {
    _classCallCheck(this, Clock);
    return _callSuper(this, Clock, [props]);
  }
  _inherits(Clock, _React$Component4);
  return _createClass(Clock, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("div", {
        id: "clock"
      }, /*#__PURE__*/React.createElement("h1", {
        id: "title"
      }, "Session + Break Clock"), /*#__PURE__*/React.createElement(Settings, this.props), /*#__PURE__*/React.createElement(Timer, this.props), /*#__PURE__*/React.createElement("audio", {
        id: "beep",
        src: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav"
      }, "Your browser does not support the audio element."));
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
    sendNewBreak: function sendNewBreak(val) {
      return dispatch(updateBreakLength(val));
    },
    sendNewSession: function sendNewSession(val) {
      return dispatch(updateSessionLength(val));
    },
    sendNewTime: function sendNewTime(val) {
      return dispatch(updateTimer(val));
    },
    turnONOFF: function turnONOFF() {
      return dispatch(changeActive());
    },
    updateSection: function updateSection() {
      return dispatch(switchSection());
    },
    returnToStart: function returnToStart() {
      return dispatch(resetClock());
    }
  };
};
var Container = connect(mapStateToProps, mapDispatchToProps)(Clock);
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
