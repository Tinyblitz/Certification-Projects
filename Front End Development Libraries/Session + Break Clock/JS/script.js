// Variables
const minMinutes = 1, maxMinutes = 60;

// Redux variables
const UPDATEBREAK = 'UPDATEBREAK', UPDATESESSION = 'UPDATESESSION';
const UPDATETIMER = 'UPDATETIMER', SWITCH = 'SWITCH', ONOFF = 'ONOFF', RESET = 'RESET';

const initialBreakLength = 5;
const initialSessionLength = 25;

const adjustBaseState = {
  breakLength: initialBreakLength, 
  sessionLength: initialSessionLength
}

const timerBaseState = {
  countdown: initialSessionLength * 60,
  onBreak: false,
  isRunning: false
};

///// Redux

// Actions

const updateBreakLength = (value) => ({
  type: UPDATEBREAK,
  value: value
});

const updateSessionLength = (value) => ({
  type: UPDATESESSION,
  value: value
});

const updateTimer = (value) => ({
  type: UPDATETIMER,
  value: value
});

const changeActive = () => ({ type: ONOFF });
const switchSection = () => ({ type: SWITCH });
const resetClock = () => ({ type: RESET });

// Reducers

const adjustmentReducer = (state = adjustBaseState, action) => {
  switch(action.type){
    case UPDATEBREAK:
      return ({...state, breakLength: action.value});
    case UPDATESESSION:
      return ({...state, sessionLength: action.value});
    case RESET:
      return adjustBaseState;
    default:
      return state;
  }
};

const timerReducer = (state = timerBaseState, action) => {
  switch(action.type){
    case UPDATETIMER:
      return ({...state, countdown: action.value});
    case ONOFF:
      return ({...state, isRunning: !state.isRunning});
    case SWITCH:
      return ({...state, onBreak: !state.onBreak});
    case RESET:
      return timerBaseState;
    default:
      return state;
  }
};

const reducer = Redux.combineReducers({
  timer: timerReducer,
  adjuster: adjustmentReducer
});

const store = Redux.createStore(reducer);

///// React

class Adjustment extends React.Component {
   constructor(props){
    super(props);
    
    this.updateCountdown = this.updateCountdown.bind(this);
    this.changeLength = this.changeLength.bind(this);
    this.handleIncrement = this.handleIncrement.bind(this);
    this.handleDecrement = this.handleDecrement.bind(this);
  }
  
  updateCountdown(val) { this.props.sendNewTime(val); }
  
  changeLength(val) {
    if (this.props.timer.isRunning) return;
    const ID = this.props.name.toLowerCase();
    const tLength = ID === 'break' ? this.props.adjuster.breakLength : this.props.adjuster.sessionLength;
    const isBreak = ID === 'break';
    const isSession = ID === 'session';

    const limitCheck = val > 0 ? tLength + val > maxMinutes : tLength + val < minMinutes;
    if (limitCheck) return;
    if (isBreak) this.props.sendNewBreak(tLength + val);
    if (isSession) this.props.sendNewSession(tLength + val);
    
    const breakCheck = this.props.timer.onBreak && isBreak;
    const sessionCheck = !this.props.timer.onBreak && isSession;
    if (breakCheck || sessionCheck) this.props.sendNewTime((tLength + val) * 60);
  } 
  
  handleIncrement() { this.changeLength(1); }
  handleDecrement() { this.changeLength(-1); }
  
  render() {
    const ID = this.props.name.toLowerCase();
    return(
      <div id={`${ID}-container`}>
        <label id={`${ID}-label`} className="adjust-label">{this.props.name} Length</label>
        <div className="adjustments">
          <i id={`${ID}-decrement`} className="fa-solid fa-angle-down" onClick={this.handleDecrement}></i>
          <span id={`${ID}-length`}>{ID === 'break' ? this.props.adjuster.breakLength : this.props.adjuster.sessionLength}</span>
          <i id={`${ID}-increment`} className="fa-solid fa-angle-up" onClick={this.handleIncrement}></i>
        </div>
      </div>
    );
  }
}

class Settings extends React.Component {
  constructor(props){
    super(props);
  }
  
  render() {
    return(
      <div id="settings">
        <Adjustment name="Break" {...this.props}/>
        <Adjustment name="Session" {...this.props}/>
      </div>
    );
  }
}

class Timer extends React.Component {
   constructor(props){
    super(props);
     
    this.countdown;
    this.changeOver;
    
    this.handleTimer = this.handleTimer.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }
  
//   sendNewTime
// turnONOFF
// setSection
  
  handleTimer() {
    
    const playBtn = document.querySelector('#play-btn');
    const pauseBtn = document.querySelector('#pause-btn');
    const timerDiv = document.querySelector('#timer-container');
    const audioPlayer = document.querySelector('#beep');

    if (this.props.timer.isRunning) {
      
      clearInterval(this.countdown);
      
      playBtn.classList.remove('on');
      pauseBtn.classList.add('on');
    }
    else {
      this.countdown = setInterval( () => {
        
        let newTime = this.props.timer.countdown - 1;
   
        if (newTime === 59) {
          timerDiv.classList.add('low');
        }
        else if (newTime === 0) {
          
          audioPlayer.play();
          
          this.changeOver = setTimeout(() => {
            const setTime = (this.props.timer.onBreak ? this.props.adjuster.sessionLength : this.props.adjuster.breakLength) * 60;
            this.props.sendNewTime(setTime);
            this.props.updateSection();
            timerDiv.classList.remove('low');
          }, 4000);
        }
        else if (newTime < 0) newTime = 0;
        this.props.sendNewTime(newTime);
      },1000);
      
      playBtn.classList.add('on');
      pauseBtn.classList.remove('on');
    }
    
    this.props.turnONOFF();
  }
  
  handleReset() {
    
    document.querySelector('#play-btn').classList.remove('on');
    document.querySelector('#pause-btn').classList.add('on');
    document.querySelector('#timer-container').classList.remove('low');
    
    clearInterval(this.countdown);
    clearTimeout(this.changeOver);
    
    const audioPlayer = document.querySelector('#beep');
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
    
    this.props.returnToStart();
  }
  
  render() {
    const minutes = Math.floor(this.props.timer.countdown / 60);
    const seconds = this.props.timer.countdown % 60;
    const formattedTime = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    return(
      <div id="clock-container">
        <div id="timer-container">
          <label id="timer-label">{this.props.timer.onBreak ? `Break` : `Session`}</label>
          <p id="time-left">{formattedTime}</p>
        </div>
        <div id="timer-controls">
          <button id="start_stop" onClick={this.handleTimer}>
            <i id="play-btn" className="fa fa-play"></i>
            <i id="pause-btn" className="fa fa-pause on"></i>
          </button>
          <button id="reset" onClick={this.handleReset}><i id="reset-btn" className="fa fa-rotate"></i></button>
        </div>
      </div>
    );
  }
}

class Clock extends React.Component {
  constructor(props){
    super(props);
  }
  
  render() {
    return(
      <div id="clock">
        <h1 id="title">Session + Break Clock</h1>
        <Settings {...this.props}/>
        <Timer {...this.props}/>
        <audio id="beep" src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav">
          Your browser does not support the audio element.
        </audio>
      </div>    
    );
  }
}

///// React-Redux

const Provider = ReactRedux.Provider;
const connect = ReactRedux.connect;

const mapStateToProps = (state) => ({...state});
const mapDispatchToProps = (dispatch) => ({
  sendNewBreak: (val) => dispatch(updateBreakLength(val)),
  sendNewSession: (val) => dispatch(updateSessionLength(val)),
  sendNewTime: (val) => dispatch(updateTimer(val)),
  turnONOFF: () => dispatch(changeActive()),
  updateSection: () => dispatch(switchSection()),
  returnToStart: () => dispatch(resetClock())
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Clock);

class APP extends React.Component {
  render() {
    return(
    
      <Provider store={store}>
        <Container/>
      </Provider>
    
    );
  }
}

const root = ReactDOM.createRoot(document.querySelector('main'));
root.render(<APP/>);