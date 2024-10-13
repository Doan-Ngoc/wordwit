import React, { useState } from 'react';
import './App.css';
import Heading from './components/Heading/Heading';
import Board from './components/Board/Board';
import Keyboard from './components/Keyboard/Keyboard';

function App() {
  const [board, setBoard] = useState<string[]>(
    ["", "", "", "", "",
     "", "", "", "", "",
     "", "", "", "", "",
     "", "", "", "", "",
     "", "", "", "", "",
     "", "", "", "", ""
    ]
  )
  return (
    <div className="App">
      <Heading type="h1" text="Wordwit" />
      <Heading type="subtitle" text="Another Wordle clone" />
      <div className='board-container'>
        <Board board={board}/>
      </div>
      <Keyboard />
    </div>
  );
}

export default App;
