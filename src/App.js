import React from 'react';
import Bar from './Bar';
import Bus from './Bus';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { Select } from 'antd';
import { chordProgressions } from './Consts';
import { Slider } from 'antd';


const { Option } = Select;

const oscTypes = ["sine", "square", "triangle", "sawtooth"]
const oscFreqs = ["1n", "2n", "4n", "8n"]

function App({ appState }) {
  return (
    <div className="App">
      <div className="topbar">
        <button onClick={() => Bus.publish("app/togglePlay")}>{ appState.isPlaying ? "Stop" : "Start" }</button>

        <Select defaultValue={appState.progression} onChange={(value) => Bus.publish("chordProgressionChanged", value)}>
          {
            chordProgressions.map(progression => 
              <Option key={progression.label} value={progression.label}>{progression.label}</Option>)
          }
        </Select>
        <button onClick={() => Bus.publish("addBar")}>Insert Bar</button>
      </div>

      <div className="instrument">
        <div className="bar form">
          <div className="barTitle">Synth</div>
          <div><b>Oscillator</b></div>
          <div>Type</div> 
          <Select style={{ width: 180 }} value={appState.instrument.oscillator.type} onChange={(value) => Bus.publish("oscTypeChanged", value)}>
            {
              oscTypes.map(osc => 
                <Option key={osc} value={osc}>{osc}</Option>)
            }
          </Select>
          <div><b>Effects</b></div>
          {
            appState.instrument.effects.map((effect, effectIndex) => {
              switch(effect.type){
                case "distortion":
                  return (
                    <div key={effectIndex}>
                      <label>Distortion</label>
                      <Slider 
                          min={0}
                          max={1}
                          step={0.1}
                          style={{width: 180}} 
                          value={effect.value} 
                          onChange={(value)=> Bus.publish("effectPropChanged", { effectIndex, prop: "value", value })} 
                        />
                  </div>)
                default:
                  return (<div key={effectIndex}></div>)
              }
            })
          }
        </div>
          {
            appState.bars.map((bar, barIndex) => 
              <Bar isPlaying={appState.isPlaying} step={appState.step} key={barIndex} barIndex={barIndex} bar={bar} />
            )
          }
        </div>
    </div>
  );
}

export default App;
