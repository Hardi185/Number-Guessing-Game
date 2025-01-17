import axios from 'axios';

const API_URL = 'http://localhost:8080/api/game';

export const startGame = async () => {
  const response = await axios.post(`${API_URL}/start`);
  return response.data;
};

export const makeGuess = async (guess) => {
  const response = await axios.post(`${API_URL}/guess`, null, {
    params: { guess },
  });
  return response.data;
};
