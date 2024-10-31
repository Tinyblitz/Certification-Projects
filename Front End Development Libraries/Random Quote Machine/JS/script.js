const colors = [
  '#16a085',
  '#27ae60',
  '#2c3e50',
  '#f39c12',
  '#e74c3c',
  '#9b59b6',
  '#FB6964',
  '#342224',
  '#472E32',
  '#BDBB99',
  '#77B1A9',
  '#73A857'
];

let quotesData;

// Redux

function changeColor(){
  
  $('.quote-text').animate({ opacity: 0 }, 500, function () {
    $(this).animate({ opacity: 1 }, 500);
  });

  $('.author-text').animate({ opacity: 0 }, 500, function () {
    $(this).animate({ opacity: 1 }, 500);
  });
  
  const color = Math.floor(Math.random() * colors.length);
  $('body').animate(
    {
      backgroundColor: colors[color],
      color: colors[color]
    },
    1000
  );
  $('.button').animate(
    {
      backgroundColor: colors[color]
    },
    1000
  );
}

// Action Types
const RETRIEVE = 'RETRIEVE', DISPLAY = 'DISPLAY';
const baseState = {
  quotes: [],
  currentQuote: {}
};

const fetchQuotes = (quotes) => {
  return({
    type: RETRIEVE,
    quotes: quotes
  });
}

const retrieveQuote = (quote) => {
  return({
    type: DISPLAY,
    quote: quote
  });
}

const quoteReducer = (state = baseState, action) => {
  switch(action.type) {
    case RETRIEVE:
      return (
        Object.assign({}, state, {quotes: action.quotes})
      );
    case DISPLAY:
      return (
        Object.assign({}, state, {currentQuote: action.quote})
      );
    default:
      return state;
  }
}

const store = Redux.createStore(quoteReducer);

// React
const Provider = ReactRedux.Provider;
const connect = ReactRedux.connect;

function getQuotes() {
  return $.ajax({
    headers: {
      Accept: 'application/json'
    },
    url: 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json',
    success: function (jsonQuotes) {
      if (typeof jsonQuotes === 'string') {
        quotesData = JSON.parse(jsonQuotes);
      }
    }
  });
}

class QuoteMachine extends React.Component {
  constructor(props) {
    super(props);
    this.displayQuote = this.displayQuote.bind(this);
  }
  
  displayQuote() {
    const quoteIdx = Math.floor(Math.random() * this.props.quotes.length);
    changeColor();
    setTimeout(() => this.props.retrieveNewQuote(this.props.quotes[quoteIdx]), 500);
  }
  
  render() {
    return (
      <div id="quote-box">
        <div className="quote-text">
          <i className="fa fa-quote-left"></i><span id="text">{this.props.currentQuote.quote}</span>
        </div>
        <div className="author-text">- <span id="author">{this.props.currentQuote.author}</span></div>
        <div id="buttons">
          <a id="tweet-quote" className="button" href={`https://twitter.com/intent/tweet?text="${this.props.currentQuote.quote}" - ${this.props.currentQuote.author}`} target="_blank"><i class="fa-brands fa-twitter"></i></a>
          <button id="new-quote" className="button" onClick={this.displayQuote}>New Quote</button>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {...state};
};

const mapDispatchToProps = (dispatch) => {
  return {
    retrieveNewQuote: (quote) => dispatch(retrieveQuote(quote))
  };
}

const Container = connect(mapStateToProps, mapDispatchToProps)(QuoteMachine)

class APP extends React.Component {
  constructor(props){
    super(props);
  }
  
  componentDidMount() {
    getQuotes().then( () => {
      store.dispatch(fetchQuotes(quotesData.quotes));
      changeColor();
      setTimeout(() => {
        const quoteIdx = Math.floor(Math.random() * quotesData.quotes.length);
        const quote = quotesData.quotes[quoteIdx];
        store.dispatch(retrieveQuote(quote));
      }, 500);
    });
  }
  
  render(){
    return(
      <Provider store={store}>
        <Container/>
      </Provider>
    );
  }
}

const root = ReactDOM.createRoot(document.querySelector('main'));
root.render(<APP/>);
