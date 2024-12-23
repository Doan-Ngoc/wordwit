import React from 'react';
import './App.css';
import { useSelector } from 'react-redux';
import Heading from './components/Heading/Heading';
import Board from './components/Board/Board';
import Keyboard from './components/Keyboard/Keyboard';
import SideBar from './components/SideBar/SideBar';
import { rootState } from './redux/interface';

function App() {
  const board = useSelector((state:rootState) => state.board.board)
  return (
    <div className="App">
      <Heading/>
      <Board board={board}/>
      <Keyboard />
      <SideBar />
    </div>
  );
}

export default App;
