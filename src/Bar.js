import React from 'react';
import Row from './Row';
import Bus from './Bus';
import { Select } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Space } from 'antd';

const { Option } = Select;

const chords = [
  "C", "Cm", "D", "Dm", "E", "Em", "F", "Fm", "G", "Gm", "A", "Am", "B", "B7", "Bm"
]

function Bar({ isPlaying, step, barIndex, bar }){

  const menu = (<Menu items={[
    {
      key: '1',
      label: (<a href="#" onClick={() => Bus.publish("clearBar", barIndex)}>Clear Bar</a>),
    },
    {
      key: '2',
      label: (<a href="#" onClick={() => Bus.publish("removeBar", barIndex)}>Remove</a>),
    },
    ]} 
  />)

  return (
    <div className="bar">
      <div className="barTitle">
        <Select
          value={bar.chord.title} 
          onChange={(value) => Bus.publish("changeBarChord", {barIndex, value})}>
          { 
            chords.map(chord => 
              <Option key={chord} value={chord}>{chord}</Option>)
          }
        </Select>
        
        <div className="barButton right">
          <Dropdown overlay={menu} trigger={['click']}>
            <button href="#" onClick={e => e.preventDefault()}>
              <Space>
                <DownOutlined />
              </Space>
            </button>
          </Dropdown>
        </div>
      </div>

      {
        bar.chord.rows.map((row, rowIndex) => 
          <Row 
            isPlaying={isPlaying} 
            step={step} 
            key={rowIndex} 
            barIndex={barIndex} 
            rowIndex={rowIndex} 
            row={row} 
            rowCellValues={bar.cellValues[rowIndex]}
          />)
      }
    </div>

  )
}


export default Bar;
