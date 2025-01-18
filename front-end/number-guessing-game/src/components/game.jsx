import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { incrementAttempts, resetAttempts } from '../redux/attemptsSlice';
import { resetGame, makeGuess } from '../services/gameService';
import { MESSAGES} from '../constants/messages'

function Game() {
  const [message, setMessage] = useState('');
  const [guess, setGuess] = useState('');
  const [score, setScore] = useState(1000);
  const attempts = useSelector((state) => state.attempts.attempts);
  const dispatch = useDispatch();

  const handleResetGame = async () => {
    const response = await resetGame();
    setMessage(response);
    dispatch(resetAttempts()); // Reset attempts on a new game
    setGuess(''); // Clear the input field
  };

  const handleMakeGuess = async () => {
    console.log("attempts:",attempts);
    if (!guess) {
      setMessage('Please enter a valid number.');
      return;
    }

    dispatch(incrementAttempts());
    console.log("attempts after incrementAttempts:", attempts);
    const response = await makeGuess(parseInt(guess), parseInt(attempts));
    console.log("response:", response);

    if(response.message == MESSAGES.GAME_OVER)
    {
      dispatch(resetAttempts());
      console.log("attempts after reset:",attempts);
      setGuess('');
    }

    if (response) {
      setMessage(response.message); // Set the message from backend
      setScore(response.score); // Set the score from backend
    }

    // else{
    //    // Increment attempts after a guess
    // }
  };

  return (
    <div className="container mx-auto text-center my-8">
      <h1 className="text-2xl font-bold mb-4">Number Guessing Game</h1>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={handleResetGame}
      >
        Reset Game
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
      <p className="mt-4 text-lg">Score: {score}</p>

    </div>
  );
}

export default Game;
