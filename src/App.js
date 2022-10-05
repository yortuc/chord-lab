import React from 'react';
import Bar from './Bar';
import Bus from './Bus';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'


function App({ appState }) {
  return (
    <div className="App">
      <div className="topbar">
        Chord Sequencer
        <button onClick={() => Bus.publish("app/togglePlay")}>{ appState.isPlaying ? "Stop" : "Start" }</button>
        <button onClick={() => Bus.publish("addBar")}>Insert Bar</button>
      </div>

        {
          appState.bars.map((bar, barIndex) => 
            <Bar isPlaying={appState.isPlaying} step={appState.step} key={barIndex} barIndex={barIndex} bar={bar} />
          )
        }
    </div>
  );
}

export default App;
