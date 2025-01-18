import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { incrementAttempts, resetAttempts } from '../redux/attemptsSlice';
import { makeGuess } from '../services/gameService';
import { MESSAGES } from '../constants/messages';
import { setScore } from '../redux/scoreSlice';

function Game({onReset }) {
  const [message, setMessage] = useState('');
  const [guess, setGuess] = useState('');
  const [selectedNumbers, setSelectedNumbers] = useState(new Set());
  const [correctNumber, setCorrectNumber] = useState(null); // Track the correct number
  const [gameOver, setGameOver] = useState(false); // Track if the game is over
  const attempts = useSelector((state) => state.attempts.attempts);
  const dispatch = useDispatch();

  const handleNumberClick = async (number) => {
    // If the number has already been selected, do nothing
    if (selectedNumbers.has(number) || gameOver) return;

    setGuess(number.toString());
    setSelectedNumbers((prev) => new Set(prev).add(number)); // Mark the number as selected
    dispatch(incrementAttempts());

    const response = await makeGuess(number, parseInt(attempts));
    if (response) {
      setMessage(response.message);
      dispatch(setScore(response.score));
    }

    if (response.message.includes(MESSAGES.CORRECT_GUESS)) {
      setCorrectNumber(number); // Mark the correct number
      setGameOver(true); // End the game
    }

    if (response.message === MESSAGES.GAME_OVER) {
      setGameOver(true); // End the game if the user runs out of attempts
      dispatch(resetAttempts());
    }
  };

  // Reset game state
  const handleReset = () => {
    setSelectedNumbers(new Set());
    setCorrectNumber(null);
    setMessage('');
    setGuess('');
    setGameOver(false); // Reset game state
  };

  // Pass the reset function to the parent
  onReset(handleReset);

  return (
    <div>
    <p className="text-xl mt-4">{message}</p>
    <div className="container mx-auto text-center my-8">
      <div className="grid grid-cols-10 gap-2">
        {Array.from({ length: 100 }, (_, i) => i + 1).map((number) => (
          <button
            key={number}
            onClick={() => handleNumberClick(number)}
            className={`text-black font-bold py-2 rounded border ${
              gameOver
                ? 'bg-gray-400 cursor-not-allowed' // Disable all buttons and turn them gray when game is over
                : correctNumber === number
                ? 'bg-green-500 cursor-not-allowed' // Mark correct number in green with ✔
                : selectedNumbers.has(number)
                ? 'bg-red-500 cursor-not-allowed' // Mark selected numbers in red with ✖
                : 'bg-gray-200 hover:bg-blue-500' // Default button style
            }`}
            disabled={gameOver || selectedNumbers.has(number) || correctNumber === number} // Disable all buttons if game is over
          >
            {correctNumber === number
              ? '✔'
              : selectedNumbers.has(number)
              ? '✖'
              : number}
          </button>
        ))}
      </div>
    </div>
  </div>
  );
}

export default Game;
