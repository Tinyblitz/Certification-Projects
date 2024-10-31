// Variables

const btnTypes = [
  { id: 'clear', text: 'AC', class: 'long' },
  { id: 'divide', text: '/', class: 'oprtn' },
  { id: 'multiply', text: 'x', class: 'oprtn' },
  { id: 'seven', text: '7', class: 'num' },
  { id: 'eight', text: '8', class: 'num' },
  { id: 'nine', text: '9', class: 'num' },
  { id: 'subtract', text: '-', class: 'oprtn' },
  { id: 'four', text: '4', class: 'num' },
  { id: 'five', text: '5', class: 'num' },
  { id: 'six', text: '6', class: 'num' },
  { id: 'add', text: '+', class: 'oprtn' },
  { id: 'one', text: '1', class: 'num' },
  { id: 'two', text: '2', class: 'num' },
  { id: 'three', text: '3', class: 'num' },
  { id: 'equals', text: '=', class: 'tall' },
  { id: 'zero', text: '0', class: 'long num' },
  { id: 'decimal', text: '.', class: 'num' }
];

///// Redux

// actions

const OPERATION = 'OPERATION', CALCULATE = 'CALCULATE', CUT= 'CUT', RESET = 'RESET', CLEAR = 'CLEAR';

const addOperation = (char) => ({
  type: OPERATION,
  char: char
});

const submitCalculation = (number) => ({
  type: CALCULATE,
  number: number
});

const cutFormula = (start,end) => ({
  type: CUT,
  start: start,
  end: end
});

const resetInput = () => ({
  type: RESET
});

const makeClear = () => ({
  type: CLEAR
});

const baseState = {
  formula: "",
  display: '0',
  isCalculated: false
};

const reducer = (state = baseState, action) => {
  switch(action.type) {
    case OPERATION:
      return {
        formula: state.formula.concat(action.char),
        display: state.display.concat(action.char),
        isCalculated: false
      };
    case CALCULATE:
      return {
        formula: state.formula.concat(`=${action.number}`),
        display: action.number,
        isCalculated: true
      };
    case CUT:
      return {...state, formula: state.formula.slice(action.start, action.end)};
    case RESET:
      return {...state, display: ''};
    case CLEAR:
      return baseState;
    default:
      return state;
  }
};

const store = Redux.createStore(reducer);

///// React

class Display extends React.Component {
  constructor(props){
    super(props);
  }
  
  render() {
    return (
      <div id="output">
        <div id="calculation">{this.props.formula}</div>
        <div id="display">{this.props.display}</div>
      </div>
    );
  }
}

let digitLimitOn = false;

class Btn extends React.Component {
  constructor(props){
    super(props);
    
    this.handleBtn = this.handleBtn.bind(this);
  }
  
  calculate(str) {
    
    const MDRegex = /-?\d+(?:\.\d+)?(⋅|\/)-?\d+(?:\.\d+)?/;
    const ASRegex = /-?\d+(?:\.\d+)?(\+|\-)-?\d+(?:\.\d+)?/
    
    let resultStr = str;
    
    // Deal with multiplication and division first
    do {
      resultStr = resultStr.replace(MDRegex, (match, opr) => {
        const [a, b] = match.split(opr).map(Number);
        return opr === '⋅' ? a * b : a / b;
      });
    } while (MDRegex.test(resultStr));
    
    // Then deal with addition and subtraction
    do {
      resultStr = resultStr.replace(ASRegex, (match, opr) => {
        const [a, b] = match.split(opr).map(Number);
        return opr === '+' ? a + b : a - b;
      });
    } while (ASRegex.test(resultStr));
    if (resultStr.slice(-1) === '.') resultStr = resultStr.slice(0, -1);
    
    const numResult = Number(resultStr);
    if (!isNaN(numResult)) { // Check if numResult is a valid number
      // If the number has a decimal point, check its decimal places
      if (resultStr.includes('.')) {
        const decimalPart = resultStr.split('.')[1];
        if (decimalPart.length > 6) {
          resultStr = numResult.toFixed(6); // Round to 6 decimal places
        }
      } else if (resultStr.length > 10) {
        resultStr = numResult.toExponential(5); // Convert to scientific notation
      }
    }
    return resultStr;
  }

  handleBtn() {
    
    let text = this.props.text === 'x' ? '⋅' : this.props.text;
    const numRegex = /^-|(?:-?\d+(?:\.\d*)?)$/;
    const oprtnRegex = /^⋅|\/|\+|-$/;
    const eqnRegex = /^[^=]*=/;
    
    const trimDecimal = () => {
      if (this.props.formula.slice(-1) === '.') this.props.changeFormula(0,-1);
    };
    
    const match = this.props.formula.match(/\d+(?:\.\d*)?$/);
    const mostRecentNumber = match ? match : null;
    
    switch(this.props.id) {
      case 'clear':
        this.props.pressClear();
        break;
      case 'equals':
        trimDecimal();
        const result = this.calculate(this.props.formula);
        this.props.passResult(result);
        break;
      case 'decimal':
        if (this.props.display.includes('.')) break;
        if (this.props.display === '0' || oprtnRegex.test(this.props.display)) {
          const check = oprtnRegex.test(this.props.formula.slice(-2,-1));
          if (!check && this.props.formula !== "-") this.props.confirmNumber();
          this.props.sendInput('0');
        }
        this.props.sendInput(text);
        break;
      case 'subtract':
        trimDecimal();
        if (this.props.formula.slice(-1) === '-') this.props.changeFormula(0,-1);
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
        if (oprtnRegex.test(this.props.formula.slice(-1))){
          if (this.props.formula.slice(-1) === '-' && oprtnRegex.test(this.props.formula.slice(-2,-1))) this.props.changeFormula(0,-2);
          else this.props.changeFormula(0,-1);
        }
        if(this.props.isCalculated) {
          const result = this.props.formula.replace(eqnRegex, '');
          const cutOff = this.props.formula.length - result.length;
          this.props.changeFormula(cutOff,this.props.formula.length);
        }
        this.props.confirmNumber();
        this.props.sendInput(text);
        break;
      default:
        if (this.props.display.length + 1 > 14) {
          if (digitLimitOn) break;
          const hold = this.props.display;
          const indx = this.props.formula.length;
          this.props.confirmNumber();
          this.props.sendInput('Digit Limit Met');
          this.props.changeFormula(0,indx);
          setTimeout(() => {
            this.props.confirmNumber();
            this.props.sendInput(hold);
            this.props.changeFormula(0,indx);
            digitLimitOn = false;
          },3000);
          digitLimitOn = true;
          break;
        }
        if (this.props.isCalculated) {
          this.props.pressClear();
          this.props.confirmNumber();
        }
        if (this.props.display === '0' || oprtnRegex.test(this.props.display)) {
          const check = oprtnRegex.test(this.props.formula.slice(-2,-1));
          if (!check && this.props.formula !== "-") this.props.confirmNumber();
        }
        this.props.sendInput(text);
        break;
    }
  }
  
  render() {
    return (
    
      <button id={this.props.id} class={`btn ${this.props.class}`} type="button" onClick={this.handleBtn}>{this.props.text}</button>
      
    );
  }
}

class Keypad extends React.Component {
  constructor(props){
    super(props);
  }
  
  render() {
    
    const listBtns = btnTypes.map((btn) => <Btn {...btn} {...this.props}/>);
    
    return (
      <div id="keypad">
        {listBtns}
      </div>

    );
  }
}

class Calculator extends React.Component {
  constructor(props){
    super(props);
  }
  
  render() {
    return (
    
        <div id="calculator">
          <Display {...this.props}/>
          <Keypad {...this.props}/>
        </div>
    
    );
  }
}

///// React-Redux

const Provider = ReactRedux.Provider;
const connect = ReactRedux.connect;

const mapStateToProps = (state) => ({...state});

const mapDispatchToProps = (dispatch) => {
  return ({
    sendInput: (char) => dispatch(addOperation(char)),
    passResult: (num) => dispatch(submitCalculation(num)),
    changeFormula: (start,end) => dispatch(cutFormula(start, end)),
    confirmNumber: () => dispatch(resetInput()),
    pressClear: () => dispatch(makeClear())
  });
};

const Container = connect(mapStateToProps, mapDispatchToProps)(Calculator);

class APP extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Container/>
      </Provider>
    ) 
  }
}

const root = ReactDOM.createRoot(document.querySelector('main'));
root.render(<APP/>);