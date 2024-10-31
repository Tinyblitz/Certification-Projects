"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
var colors = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', '#472E32', '#BDBB99', '#77B1A9', '#73A857'];
var quotesData;

// Redux

function changeColor() {
  $('.quote-text').animate({
    opacity: 0
  }, 500, function () {
    $(this).animate({
      opacity: 1
    }, 500);
  });
  $('.author-text').animate({
    opacity: 0
  }, 500, function () {
    $(this).animate({
      opacity: 1
    }, 500);
  });
  var color = Math.floor(Math.random() * colors.length);
  $('body').animate({
    backgroundColor: colors[color],
    color: colors[color]
  }, 1000);
  $('.button').animate({
    backgroundColor: colors[color]
  }, 1000);
}

// Action Types
var RETRIEVE = 'RETRIEVE',
  DISPLAY = 'DISPLAY';
var baseState = {
  quotes: [],
  currentQuote: {}
};
var fetchQuotes = function fetchQuotes(quotes) {
  return {
    type: RETRIEVE,
    quotes: quotes
  };
};
var retrieveQuote = function retrieveQuote(quote) {
  return {
    type: DISPLAY,
    quote: quote
  };
};
var quoteReducer = function quoteReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : baseState;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  switch (action.type) {
    case RETRIEVE:
      return Object.assign({}, state, {
        quotes: action.quotes
      });
    case DISPLAY:
      return Object.assign({}, state, {
        currentQuote: action.quote
      });
    default:
      return state;
  }
};
var store = Redux.createStore(quoteReducer);

// React
var Provider = ReactRedux.Provider;
var connect = ReactRedux.connect;
function getQuotes() {
  return $.ajax({
    headers: {
      Accept: 'application/json'
    },
    url: 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json',
    success: function success(jsonQuotes) {
      if (typeof jsonQuotes === 'string') {
        quotesData = JSON.parse(jsonQuotes);
      }
    }
  });
}
var QuoteMachine = /*#__PURE__*/function (_React$Component) {
  function QuoteMachine(props) {
    var _this;
    _classCallCheck(this, QuoteMachine);
    _this = _callSuper(this, QuoteMachine, [props]);
    _this.displayQuote = _this.displayQuote.bind(_this);
    return _this;
  }
  _inherits(QuoteMachine, _React$Component);
  return _createClass(QuoteMachine, [{
    key: "displayQuote",
    value: function displayQuote() {
      var _this2 = this;
      var quoteIdx = Math.floor(Math.random() * this.props.quotes.length);
      changeColor();
      setTimeout(function () {
        return _this2.props.retrieveNewQuote(_this2.props.quotes[quoteIdx]);
      }, 500);
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("div", {
        id: "quote-box"
      }, /*#__PURE__*/React.createElement("div", {
        className: "quote-text"
      }, /*#__PURE__*/React.createElement("i", {
        className: "fa fa-quote-left"
      }), /*#__PURE__*/React.createElement("span", {
        id: "text"
      }, this.props.currentQuote.quote)), /*#__PURE__*/React.createElement("div", {
        className: "author-text"
      }, "- ", /*#__PURE__*/React.createElement("span", {
        id: "author"
      }, this.props.currentQuote.author)), /*#__PURE__*/React.createElement("div", {
        id: "buttons"
      }, /*#__PURE__*/React.createElement("a", {
        id: "tweet-quote",
        className: "button",
        href: "https://twitter.com/intent/tweet?text=\"".concat(this.props.currentQuote.quote, "\" - ").concat(this.props.currentQuote.author),
        target: "_blank"
      }, /*#__PURE__*/React.createElement("i", {
        "class": "fa-brands fa-twitter"
      })), /*#__PURE__*/React.createElement("button", {
        id: "new-quote",
        className: "button",
        onClick: this.displayQuote
      }, "New Quote")));
    }
  }]);
}(React.Component);
;
var mapStateToProps = function mapStateToProps(state) {
  return _objectSpread({}, state);
};
var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    retrieveNewQuote: function retrieveNewQuote(quote) {
      return dispatch(retrieveQuote(quote));
    }
  };
};
var Container = connect(mapStateToProps, mapDispatchToProps)(QuoteMachine);
var APP = /*#__PURE__*/function (_React$Component2) {
  function APP(props) {
    _classCallCheck(this, APP);
    return _callSuper(this, APP, [props]);
  }
  _inherits(APP, _React$Component2);
  return _createClass(APP, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      getQuotes().then(function () {
        store.dispatch(fetchQuotes(quotesData.quotes));
        changeColor();
        setTimeout(function () {
          var quoteIdx = Math.floor(Math.random() * quotesData.quotes.length);
          var quote = quotesData.quotes[quoteIdx];
          store.dispatch(retrieveQuote(quote));
        }, 500);
      });
    }
  }, {
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
