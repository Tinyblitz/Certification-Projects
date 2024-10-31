// Variables
const keys = {
  'Q': [{name: 'Heater 1', source: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-1.mp3"},{name: 'Chord 1', source: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3"}],
  'W': [{name: 'Heater 2', source: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-2.mp3"},{name: 'Chord 2', source: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3"}],
  'E': [{name: 'Heater 3', source: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-3.mp3"},{name: 'Chord 3', source: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3"}],
  'A': [{name: 'Heater 4', source: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-4_1.mp3"},{name: 'Shaker', source: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3"}],
  'S': [{name: 'Clap', source: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-6.mp3"},{name: 'open HH', source: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3"}],
  'D': [{name: 'Open HH', source: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Dsc_Oh.mp3"},{name: 'closed HH', source: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3"}],
  'Z': [{name: "Kick n' Hat", source: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Kick_n_Hat.mp3"},{name: 'Punchy Kick', source: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3"}],
  'X': [{name: 'Kick', source: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/RP4_KICK_1.mp3"},{name: 'Side Stick', source: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3"}],
  'C': [{name: 'Closed HH', source: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Cev_H2.mp3"},{name: 'Snare', source: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3"}],
};

// Helper Functions
function playAudio(key) {
  const targetButton = document.getElementById('key');
}

///// Redux
// Actions
const DISPLAY = 'DISPLAY';
const POWER = 'POWER';
const BANK = 'BANK';

const updateDisplay = (str) => {
  return({
   type: DISPLAY,
   str: str
  });
};

const changePower = () => {
  return({
    type: POWER
  });
};

const changeBank = () => {
  return({
    type: BANK 
  });
};

// Reducers

const initialState = {
  powerOn: true,
  bankOn: false,
  message: ""
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case DISPLAY:
      return {...state, message: action.str}
    case POWER:
      return {...state, powerOn: !state.powerOn}
    case BANK:
      return {...state, bankOn: !state.bankOn}
    default:
      return state;
  }
};

const store = Redux.createStore(reducer);
const Provider = ReactRedux.Provider;
const connect = ReactRedux.connect;

///// React

class Pad extends React.Component {
  constructor(props){
    super(props);
    
    this.convertRegex = /\W+/g;

    this.handleButton = this.handleButton.bind(this);
    this.handleKey = this.handleKey.bind(this);
  }
  
  getID () {
    const arr = keys[this.props.text];
    const obj = this.props.bankOn ? arr[1] : arr[0];
    return obj.name;
  }
  
  handleButton() {
    
    const name = this.getID();
    const ID = name.replace(this.convertRegex,"-");
    
    const thisBtn = document.querySelector(`#${ID}`);
    thisBtn.classList.add('active');
    setTimeout( () => {
      thisBtn.classList.remove('active');
    } , 100);
    
    if (!this.props.powerOn) return;
  
    thisBtn.classList.add('lit');
    setTimeout( () => {
      thisBtn.classList.remove('lit');
    } , 100);
    
    this.props.updateNewDisplay(name);
    
    const thisAudio = document.querySelector(`#${this.props.text}`);
    thisAudio.currentTime = 0;
    thisAudio.play();
  }
  
  handleKey(event) {
    if (event.key.toUpperCase() === this.props.text) this.handleButton();
  }
  
  componentDidMount() {
    document.addEventListener('keyup', this.handleKey);
  }
  
  componentWillUnmount() {
    document.removeEventListener('keyup', this.handleKey);
  }
  
  render() {
    const arr = keys[this.props.text];
    const obj = this.props.bankOn ? arr[1] : arr[0];
    const regex = /\W+/g;
    const fixedID = obj.name.replace(regex,"-");
    
    return(
      <button id={fixedID} className="drum-pad" type="button" onClick={this.handleButton} tabindex="0">{this.props.text}
        <audio id={this.props.text} className="clip" src={obj.source}>
          Your browser does not support the audio element.
        </audio>
      </button>
    );
  }
}

class DrumPads extends React.Component {
  constructor(props){
    super(props);
  }
  
  render() {
    const pads = Object.keys(keys).map((key)=>{
      return <Pad text={key} {...this.props}/>
    });
    return(
      <div id="drum-pads">
        {pads}
      </div>
    );
  }
}

class Controller extends React.Component {
  constructor(props){
    super(props);
    
    this.changeBtnState = this.changeBtnState.bind(this);
  }
  
  changeBtnState() {
    const btnType = this.props.type.toLowerCase();
    if (btnType !== 'power' && !this.props.powerOn) return;
    btnType === 'power' ? this.props.turnOnOff() : this.props.switchBank();
    this.props.updateNewDisplay("");
  }
  
  render() {
    const cType = this.props.type.toLowerCase();
    const isOn = cType === 'power' ? this.props.powerOn : this.props.bankOn;
    return(
      <div id={`${cType}-ctrl`} className="controller">
        <label>{this.props.type}</label>
        <button id={`${cType}-btn`} className="switch-btn" type="button" onClick={this.changeBtnState} tabindex="0">
          {isOn ? <div className="switch-side"/> : <div className="switch-side active"/>}
          {isOn ? <div className="switch-side active"/> : <div className="switch-side"/>}
        </button>
      </div>
    );
  }
}

class ControlArea extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {
      vol: 30
    }
    
    this.updateVolume = this.updateVolume.bind(this);
  }
  
  updateVolume(event) {
    if (!this.props.powerOn) return;
    this.setState((state) => ({
      vol: event.target.value
    }), () => {
      const audioVolume = this.state.vol / 100;
      document.querySelectorAll('.clip').forEach(el => el.volume = audioVolume);
      this.props.updateNewDisplay("Volume: " + this.state.vol);
      setTimeout(()=>this.props.updateNewDisplay(""),1650);
    });
  }
  
  componentDidMount() {
    document.querySelectorAll('.clip').forEach(el => el.volume = this.state.vol / 100);
  }
  
  render() {
    return(
      <div id="control-area">
        <Controller type="Power" {...this.props}/>

        <div id="display">
          <span id="output">{this.props.message}</span>
        </div>

        <input type="range" min="0" max="100" value={this.state.vol} id="vol-ctrl" className="slider" onChange={this.updateVolume}/>

        <Controller type="Bank" {...this.props}/>
      </div>
    );
  }
}

class DrumMachine extends React.Component {
  constructor(props){
    super(props);
  }
  
  render() {
    return (
    
      <div id="drum-machine">
        <DrumPads {...this.props}/>
        <ControlArea {...this.props}/>
      </div>
    );
  }
}

///// React-Redux

const mapStateToProps = (state) => {
  return({...state});
};

const mapDispatchToProps = (dispatch) => {
  return({
    updateNewDisplay: (str) => dispatch(updateDisplay(str)),
    turnOnOff: () => dispatch(changePower()),
    switchBank: () => dispatch(changeBank())
  });
};

const Container = connect(mapStateToProps,mapDispatchToProps)(DrumMachine);

class APP extends React.Component {
  render() {
    return(
    
      <Provider store={store}>
        <Container />
      </Provider>
    
    );
  }
}

const root = ReactDOM.createRoot(document.querySelector('main'));
root.render(<APP/>);