import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { incrementAttempts, resetAttempts } from '../redux/attemptsSlice';
import { resetGame, makeGuess } from '../services/gameService';
import { MESSAGES } from '../constants/messages';

function Game() {
  const [message, setMessage] = useState('');
  const [grid, setGrid] = useState([]); // Number grid
  const [score, setScore] = useState(1000);
  const attempts = useSelector((state) => state.attempts.attempts);
  const dispatch = useDispatch();

  useEffect(() => {
    generateGrid(); // Create grid on component load
  }, []);

  const generateGrid = () => {
    const numbers = Array.from({ length: 25 }, (_, i) => i + 1); // Numbers 1 to 25
    setGrid(numbers);
  };

  const handleResetGame = async () => {
    const response = await resetGame();
    setMessage(response);
    dispatch(resetAttempts());
    generateGrid(); // Reset the grid
  };

  const handleTileClick = async (number) => {
    dispatch(incrementAttempts());
    const response = await makeGuess(number, attempts);

    if (response.message === MESSAGES.GAME_OVER) {
      dispatch(resetAttempts());
      setMessage(response.message);
    } else {
      setMessage(response.message);
      setScore(response.score);

      // Optional: Update grid or highlight tile
      setGrid((prevGrid) =>
        prevGrid.map((num) =>
          num === number ? { value: num, status: response.status } : num
        )
      );
    }
  };

  return (
    <div className="container mx-auto text-center my-8">
      

      <div className="grid grid-cols-5 gap-4">
        {grid.map((number) => (
          <button
            key={number}
            className="bg-purple-500 text-white px-4 py-6 rounded-md hover:bg-purple-700"
            onClick={() => handleTileClick(number)}
          >
            {number}
          </button>
        ))}
      </div>

      <p className="text-xl mt-4">{message}</p>
    </div>
  );
}

export default Game;
