import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as Tone from 'tone'
import Bus from './Bus';
import createChord from './createChord';
import { chordProgressions, defaultCellValues, emptyCellValues } from './Consts';

const WIDTH = 8;

const synths = [
  new Tone.Synth(),
  new Tone.Synth(),
  new Tone.Synth(),
  new Tone.Synth(),
  new Tone.Synth(),
  new Tone.Synth()
]

const autoFilter = new Tone.AutoFilter("4n").toDestination()


const gain = new Tone.Gain(1.0);
gain.connect(autoFilter)

const setOscTypes = (type) => synths.forEach(s => {
  s.oscillator.type = type;
  s.connect(gain)
});

Tone.Transport.scheduleRepeat(repeat, '8n');

const appState = {
  step: 0,
  isPlaying: false,
  progression: "Savrulan Adam",
  instrument: {
    oscillator: {
      type: "triangle"
    },
    filters: [
      {type: "auto", frequency: "4n"}
    ]
  },
  bars: [
    {chord: createChord("Em"), cellValues: [...defaultCellValues]},
    {chord: createChord("Am"), cellValues: [...defaultCellValues]}, 
    {chord: createChord("Em"), cellValues: [...defaultCellValues]},
    {chord: createChord("B7"), cellValues: [...defaultCellValues]}
  ]
}

setOscTypes(appState.instrument.oscillator.type)

Bus.subscribe("app/togglePlay", () => {
  if(appState.isPlaying){
    Tone.Transport.stop()
    index = 0
  }
  else{
    Tone.start()
    Tone.Transport.start()
  }
  appState.isPlaying = !appState.isPlaying
  renderApp(appState)
})

Bus.subscribe("setCellValue", ({cellIndex, rowIndex, barIndex, value})=>{
  const curRow = appState.bars[barIndex].cellValues[rowIndex]
  let newRow  = [...curRow]
  newRow[cellIndex] = value
  appState.bars[barIndex].cellValues[rowIndex] = newRow
  renderApp(appState)
})

Bus.subscribe("addBar", () => {
  let newBars = [...appState.bars, {chord: createChord("Em"), cellValues: [...defaultCellValues]}]
  appState.bars = newBars
  renderApp(appState)
})

Bus.subscribe("removeBar", (barIndex) => {
  appState.bars.splice(barIndex, 1)
  renderApp(appState)
})

Bus.subscribe("clearBar", (barIndex) => {
  appState.bars[barIndex].cellValues = [...emptyCellValues]
  renderApp(appState)
})

Bus.subscribe("changeBarChord", ({barIndex, value}) => {
  appState.bars[barIndex].chord = createChord(value)
  renderApp(appState)
})

Bus.subscribe("chordProgressionChanged", progression => {
  appState.bars = chordProgressions.find(cp => cp.label === progression).bars
  appState.progression = progression
  renderApp(appState)
})

Bus.subscribe("oscTypeChanged", oscType=> {
  appState.instrument.oscillator.type = oscType
  setOscTypes(oscType)
  renderApp(appState)
})

let index = 0;

function repeat(time) {
  if (!appState.isPlaying) return false; 

  const totalSteps = appState.bars.length * WIDTH
  const step = index % totalSteps
  const curBarIndex = Math.floor(step / WIDTH)

  // iterate over rows
  for(let i = 0; i < 6; i++){
    const synth = synths[i];
    const note = appState.bars[curBarIndex].chord.rows[i].note;

    if (appState.bars[curBarIndex].cellValues[i][step % WIDTH]){
      synth.triggerAttackRelease(note, '8n', time)
    }
  }
  appState.step = step
  index++;
  renderApp(appState)
}

const root = ReactDOM.createRoot(document.getElementById('root'));

function renderApp(appState){

  appState.bars.map(bar => console.log(bar.chord.title))

  root.render(
    <React.StrictMode>
      <App appState = {appState} />
    </React.StrictMode>
  );  
}

window.appState = appState
renderApp(appState);