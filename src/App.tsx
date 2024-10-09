import React from 'react';
import './App.css';
import Heading from './components/Heading/Heading';

function App() {
  return (
    <div className="App">
      <Heading type="h1" text="Wordwit" />
      <Heading type="subtitle" text="Another Wordle clone" />
    </div>
  );
}

export default App;
