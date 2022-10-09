import React from 'react';
import Bus from './Bus';


function Row({isPlaying, step, barIndex, rowIndex, row, rowCellValues }){
  return (
    <div className="row">
      <label>{row.label}</label>
      {
          rowCellValues.map((cell, cellIndex) => {
            const stepIndex = barIndex * 8 + cellIndex

            return <input 
                  className={isPlaying && step === stepIndex ? "active" : ""}
                  style={{backgroundColor: cell ? row.color : 'white' }}
                  key={"row" + rowIndex + "cell" + cellIndex} 
                  type="checkbox" 
                  checked={cell} 
                  onChange={ () => Bus.publish(
                    "setCellValue",
                    { cellIndex, rowIndex, barIndex, value: cell ? 0 : 1}) 
                  }
              />
        })
      }

    </div>
  );
}


export default Row;
