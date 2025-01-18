import React from 'react';
import logo from '../assets/logo.png';
import { resetGame } from '../services/gameService';
import { resetScore } from '../redux/scoreSlice';
import { resetAttempts } from '../redux/attemptsSlice';
import { useDispatch, useSelector } from 'react-redux';

function Navbar({ handleResetGrid }) {
  const attempts = useSelector((state) => state.attempts.attempts);
  const score = useSelector((state) => state.score.score);
  const dispatch = useDispatch();
  
  const handleResetGame = async () => {
    const response = await resetGame();
    dispatch(resetAttempts());
    dispatch(resetScore());
    handleResetGrid();
  };

  return (
    <nav className="bg-blue-500 text-white sticky top-0 shadow-md z-50">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        {/* Logo and Game Name */}
        <div className="flex items-center space-x-4">
          <img src={logo} alt="Game Logo" className="h-10 w-10" />
          <h1 className="text-xl font-bold">Guess Genius</h1>
        </div>

        {/* Attempts and Score */}
        <div className="flex items-center space-x-6">
          <p className="text-lg">Attempts: {attempts}</p>
          <p className="text-lg">Score: {score}</p>
          <button
            onClick={handleResetGame}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Reset Game
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
