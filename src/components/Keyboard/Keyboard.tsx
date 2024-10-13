import React from 'react'
import './keyboard.css'
import Key from '../Key/Key';

const Keyboard: React.FC = () => {
    const rows: string[] = [
        "q w e r t y u i o p",
        "a s d f g h j k l",
        "z x c v b n m",
      ];
  return (
    <div className='keyboard-container'>
        {rows.map((row, idx) => {
        return (
        <div className='row'>
            {idx === 2 && (
              <span className='letter-row'>
                Enter
              </span>
            )}
         {row.split(" ").map((letter, idx) => {
          return (
            <div className='letter-row'>
              <Key letter={letter.toUpperCase()} />
              {letter === "m" && <span>Back</span>}
            </div>
          )
         })}
        </div>
    )})}
    </div>
  )
}

export default Keyboard