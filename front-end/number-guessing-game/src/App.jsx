import './App.css'
import React, { useState } from 'react';
import Game from './components/game';
//import Game from './components/temp';
import NavBar from './components/navBar'

function App() {
  const [message, setMessage] = useState('');
  const [guess, setGuess] = useState('');

  return (
    <>
      <NavBar setMessage={setMessage} setGuess={setGuess} />
      <Game message={message} guess={guess} setMessage={setMessage} setGuess={setGuess} />
    </>
  );

}

export default App
