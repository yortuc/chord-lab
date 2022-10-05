import React from 'react';
import Bus from './Bus';
import { Select } from 'antd';

const { Option } = Select;

const notes = [
  'C', 'C#', 'D', 'D#', 'E','F', 'F#', 'G', 'G#', 'A', 'A#', 'B'
]

function RowWithNotes({isPlaying, step, rowIndex, label, note, cells, color }){
  return (
    <div className="row">
      <Select 
        defaultValue={note} 
        style={{ width: 70 }} 
        onChange={(note) => Bus.publish("app/setRowNote", {rowIndex, note})}
      >
        { notes.map((note, noteIndex) => <Option key={noteIndex} value={note + '4'}>{note}4</Option>)}
      </Select>

      {
          cells.map((cell, cellIndex) => 
              <input 
                  className={isPlaying && step === cellIndex ? "active" : ""}
                  style={{backgroundColor: cell ? color : 'white' }}
                  key={"row" + rowIndex + "cell" + cellIndex} 
                  type="checkbox" 
                  checked={cell} 
                  onChange={ () => Bus.publish(
                    "app/setCellValue",
                    { cellIndex, rowIndex, value: cell ? 0 : 1}) 
                  }
              />
          )
      }

    </div>
  );
}


export default RowWithNotes;
