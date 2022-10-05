import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as Tone from 'tone'
import Bus from './Bus';
import createChord from './createChord';

const WIDTH = 8;

const synths = [
  new Tone.Synth(),
  new Tone.Synth(),
  new Tone.Synth(),
  new Tone.Synth(),
  new Tone.Synth(),
  new Tone.Synth()
]

const gain = new Tone.Gain(1.0);
gain.toDestination();

synths.forEach(s => {
  s.oscillator.type = 'triangle';
  s.connect(gain)
});

Tone.Transport.scheduleRepeat(repeat, '8n');

const appState = {
  step: 0,
  isPlaying: false,
  bars: [createChord("Em"), createChord("Am"), createChord("B7")]
}

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
  const curRow = appState.bars[barIndex].rows[rowIndex]
  let newRow  = Object.assign({}, curRow)
  newRow.cells[cellIndex] = value
  appState.bars[barIndex].rows[rowIndex] = newRow
  renderApp(appState)
})

Bus.subscribe("addBar", () => {
  let newBars = [...appState.bars, createChord("Em")]
  appState.bars = newBars
  renderApp(appState)
})

let index = 0;

function repeat(time) {
  if (!appState.isPlaying) return false; 

  const totalSteps = appState.bars.length * WIDTH
  const step = index % totalSteps
  const curBarIndex = Math.floor(step / WIDTH)
  console.log(curBarIndex)

  // iterate over rows
  for(let i = 0; i < 6; i++){
    const synth = synths[i];
    const note = appState.bars[curBarIndex].rows[i].note;

    if (appState.bars[curBarIndex].rows[i].cells[step % WIDTH]){
      synth.triggerAttackRelease(note, '8n', time)
    }
  }
  appState.step = step
  index++;
  renderApp(appState)
}

const root = ReactDOM.createRoot(document.getElementById('root'));

function renderApp(appState){
  root.render(
    <React.StrictMode>
      <App appState = {appState} />
    </React.StrictMode>
  );  
}

renderApp(appState);