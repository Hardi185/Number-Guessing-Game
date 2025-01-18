import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { incrementAttempts, resetAttempts } from '../redux/attemptsSlice';
import { resetGame, makeGuess } from '../services/gameService';
import { MESSAGES } from '../constants/messages';

function Game() {
  const [message, setMessage] = useState('');
  const [guess, setGuess] = useState('');
  const [score, setScore] = useState(1000);
  const attempts = useSelector((state) => state.attempts.attempts);
  const dispatch = useDispatch();

  const handleResetGame = async () => {
    const response = await resetGame();
    setMessage(response);
    dispatch(resetAttempts());
    setGuess('');
    setScore(1000); // Reset score
  };

  const handleMakeGuess = async () => {
    if (!guess) {
      setMessage('Please enter a valid number.');
      return;
    }

    dispatch(incrementAttempts());
    const response = await makeGuess(parseInt(guess), parseInt(attempts));
    if (response) {
      setMessage(response.message);
      setScore(response.score);
    }

    if (response.message === MESSAGES.GAME_OVER) {
      dispatch(resetAttempts());
      setGuess('');
    }
  };

  return (
    <div>
      <div className="container mx-auto text-center my-8">

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
        <p className="mt-4 text-lg">Score: {score}</p>
      </div>
    </div>
  );
}

export default Game;
