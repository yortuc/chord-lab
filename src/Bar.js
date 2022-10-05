import React from 'react';
import Row from './Row';


function Bar({ isPlaying, step, barIndex, bar }){
  return (
    <div className="bar">

      <span>
        {bar.title}
        <a href="#" className="barButton">x</a>
      </span>

      {
        bar.rows.map((row, rowIndex) => 
          <Row isPlaying={isPlaying} step={step} key={rowIndex} barIndex={barIndex} rowIndex={rowIndex} row={row} />)
      }
    </div>

  )
}


export default Bar;
