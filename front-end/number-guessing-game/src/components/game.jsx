import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { incrementAttempts } from '../redux/attemptsSlice';
import { startGame, makeGuess } from '../services/gameService';

function Game() {
  const [message, setMessage] = useState('');
  const [guess, setGuess] = useState('');
  const attempts = useSelector((state) => state.attempts.attempts);
  const dispatch = useDispatch();

//   useEffect(() => {
//     // If the game is started again, reset attempts
//     dispatch(incrementAttempts());
//   }, [dispatch]);

  const handleStartGame = async () => {
    const response = await startGame();
    setMessage(response);
    dispatch(incrementAttempts()); // Increment attempts when starting a new game
  };

  const handleMakeGuess = async () => {
    if (!guess) {
      setMessage('Please enter a valid number.');
      return;
    }
    const response = await makeGuess(parseInt(guess));
    setMessage(response);
    dispatch(incrementAttempts()); // Increment attempts after a guess
  };

  return (
    <div className="container mx-auto text-center my-8">
      <h1 className="text-2xl font-bold mb-4">Number Guessing Game</h1>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={handleStartGame}
      >
        Start Game
      </button>

      <div className="mb-4">
        <input
          type="number"
          placeholder="Enter your guess"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          className="px-4 py-2 border rounded"
        />
        <button
          className="bg-green-500 text-white px-4 py-2 rounded ml-4"
          onClick={handleMakeGuess}
        >
          Guess
        </button>
      </div>

      <p className="text-xl mt-4">{message}</p>
      <p className="mt-4 text-lg">Attempts: {attempts}</p>
    </div>
  );
}

export default Game;
