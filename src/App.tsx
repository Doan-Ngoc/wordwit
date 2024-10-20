import React, { useState } from 'react';
import './App.css';
import { useSelector, UseSelector } from 'react-redux';
import Heading from './components/Heading/Heading';
import Board from './components/Board/Board';
import Keyboard from './components/Keyboard/Keyboard';
import { rootState } from './components/interface';

function App() {
  const board = useSelector((state:rootState) => state.board.board)
  return (
    <div className="App">
      <Heading/>
      <div className='board-container'>
        <Board board={board}/>
      </div>
      <Keyboard />
    </div>
  );
}

export default App;
